const sendMessage = async (transporter, html) => {
  return await transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'An EOD',
    text: 'Coming soon...',
    html,
  })
}

export default sendMessage
