const sendMessage = async (transporter, text, html) => {
  return await transporter.sendMail({
    from: 'sender@example.com',
    to: 'recipient@example.com',
    subject: 'An EOD',
    text,
    html,
  })
}

export default sendMessage
