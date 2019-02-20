import nodemailer from 'nodemailer'

import sendMessages from './sendMessage/sendMessages'
import markEodAsSent from './markEodAsSent'

const execute = async () => {
  const currentDate = new Date()
  const currentTimeUtc = currentDate.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const account = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  })

  console.log('sending...') // eslint-disable-line
  const { teams, messages } = await sendMessages(
    transporter,
    currentDate,
    currentTimeUtc
  )

  // TODO: Only mark as sent based on the teams that were delivered to
  console.log('marking as sent...') // eslint-disable-line
  await markEodAsSent(teams)

  messages.forEach(message => {
    console.log('Message sent: %s', message.messageId) // eslint-disable-line
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message)) // eslint-disable-line

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  })
}

execute().catch(console.error) // eslint-disable-line no-console
