const gql = require('graphql-tag')

const SAY_HELLO = gql`
  {
    hello {
      message
    }
  }
`

const sendMessage = async (apiClient, transporter) => {
  const { data } = await apiClient.query({ query: SAY_HELLO })

  const message = data.hello.message

  return await transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'Hello from the EOD Machine',
    text: message,
    html: `<b>${message}</b>`,
  })
}

module.exports = sendMessage
