const nodemailer = require('nodemailer')

const apiClient = require('./apiClient')
const sendMessage = require('./sendMessage')

jest.mock('./apiClient', () => {
  return {
    query: () => {
      return new Promise(resolve => {
        resolve({ data: { hello: { message: 'test message' } } })
      })
    },
  }
})

it('sends a message', async () => {
  const transporter = nodemailer.createTransport({
    jsonTransport: true,
  })

  const { message } = await sendMessage(apiClient, transporter)

  const parsedMessage = JSON.parse(message)
  expect(parsedMessage.text).toEqual('test message')
  expect(parsedMessage.html).toEqual('<b>test message</b>')
})
