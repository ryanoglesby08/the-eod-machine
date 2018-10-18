import gql from 'graphql-tag'

import apiClient from '../apiClient'

export const GET_TEAMS_WITH_EOD = gql`
  {
    teams {
      name
      mailingList
      currentEod {
        category
        content
      }
    }
  }
`

const sendMessages = async (
  transporter,
  renderTextMessage,
  renderHtmlMessage
) => {
  const {
    data: { teams },
  } = await apiClient.query({ query: GET_TEAMS_WITH_EOD })

  return await Promise.all(
    teams.map(async team => {
      return await transporter.sendMail({
        from: 'sender@example.com',
        to: team.mailingList,
        subject: 'An EOD',
        text: await renderTextMessage(team),
        html: await renderHtmlMessage(team),
      })
    })
  )
}

export default sendMessages
