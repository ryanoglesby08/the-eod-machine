import nodemailer from 'nodemailer'

import sendMessage from './sendMessage'

it('sends a message in html and text', async () => {
  const transporter = nodemailer.createTransport({
    jsonTransport: true,
  })

  const { message } = await sendMessage(
    transporter,
    'The eod message content',
    '<div>The eod message content</div>'
  )

  const parsedMessage = JSON.parse(message)
  expect(parsedMessage.text).toEqual('The eod message content')
  expect(parsedMessage.html).toEqual('<div>The eod message content</div>')
})
