import nodemailer from 'nodemailer'

import sendMessage from './sendMessage'

it('sends a message', async () => {
  const transporter = nodemailer.createTransport({
    jsonTransport: true,
  })

  const { message } = await sendMessage(
    transporter,
    '<div>The html content</div>'
  )

  const parsedMessage = JSON.parse(message)
  // expect(parsedMessage.text).toEqual('Coming soon...')
  expect(parsedMessage.html).toEqual('<div>The html content</div>')
})
