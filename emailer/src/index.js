/* eslint-disable no-console */

import nodemailer from 'nodemailer'

import sendMessages from './sendMessage/sendMessages'
import markEodAsSent from './markEodAsSent'

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env

const useRealSMTPServer = SMTP_HOST !== undefined

const execute = async () => {
  const currentDate = new Date()
  const currentTimeUtc = currentDate.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })

  let transporter
  if (useRealSMTPServer) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    })
  } else {
    const account = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
  }

  console.log('Sending messages...')
  const { teams, messages } = await sendMessages(
    transporter,
    currentDate,
    currentTimeUtc
  )

  console.log('Marking messages as sent...')
  await markEodAsSent(teams)

  if (!useRealSMTPServer) {
    messages.forEach(message => {
      console.log('Message sent: %s', message.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    })
  }
}

execute().catch(console.error)
