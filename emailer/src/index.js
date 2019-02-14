import nodemailer from 'nodemailer'

import sendMessages from './sendMessage/sendMessages'
import markEodAsSent from './markEodAsSent'

const execute = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount(async (err, account) => {
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

    // send mail with defined transport object
    try {
      console.log('sending...') // eslint-disable-line
      const messages = await sendMessages(transporter)

      console.log('marking as sent...') // eslint-disable-line
      await markEodAsSent()

      messages.forEach(message => {
        console.log('Message sent: %s', message.messageId) // eslint-disable-line
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message)) // eslint-disable-line

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      })
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  })
}

execute()
