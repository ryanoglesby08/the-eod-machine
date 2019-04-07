import gql from 'graphql-tag'

import apiClient from '../apiClient'

import { getUtcTimezone } from '../time-utils/time-zone-data'
import {
  convertLocalTimeToUtcTime,
  roundToNearestHalfHour,
} from '../time-utils/convert'
import { toShortDate, toLongDate } from '../time-utils/format'

import { renderHtmlMessage } from '../multipartMessage/HtmlMessage/HtmlMessage'
import textMessage from '../multipartMessage/textMessage/textMessage'

export const GET_TEAMS_READY_FOR_EOD_DELIVERY = gql`
  query GetTeamsReadyForEodDelivery($currentTimeUtc: String!) {
    teamsReadyForAnEodDelivery(currentTimeUtc: $currentTimeUtc) {
      _id
      name
      mailingList
      currentEod {
        author
        category
        content
      }
      locations {
        name
        timeZone
        eodTime
      }
    }
  }
`

const getLocationAtEod = (locations, currentTimeUtc) => {
  return locations.find(({ eodTime, timeZone }) => {
    const eodTimeUtc = convertLocalTimeToUtcTime(
      eodTime,
      getUtcTimezone(timeZone)
    )

    return eodTimeUtc === currentTimeUtc
  })
}

const subject = (team, eodLocation, shortDateString) =>
  [`[EOD] ${team.name}`, eodLocation.name, shortDateString].join(' | ')

const sendMessages = async (transporter, currentDate, currentTimeUtc) => {
  const currentTimeUtcRounded = roundToNearestHalfHour(currentTimeUtc)

  const {
    data: { teamsReadyForAnEodDelivery },
  } = await apiClient.query({
    query: GET_TEAMS_READY_FOR_EOD_DELIVERY,
    variables: { currentTimeUtc: currentTimeUtcRounded },
  })

  const messages = await Promise.all(
    teamsReadyForAnEodDelivery.map(async team => {
      const eodLocation = getLocationAtEod(
        team.locations,
        currentTimeUtcRounded
      )

      const shortDateString = toShortDate(
        currentDate,
        getUtcTimezone(eodLocation.timeZone)
      )
      const longDateString = toLongDate(
        currentDate,
        getUtcTimezone(eodLocation.timeZone)
      )

      const message = {
        from: {
          address: 'eod-machine@theeodmachine.local',
          name: 'EOD Machine',
        },
        to: team.mailingList,
        subject: subject(team, eodLocation, shortDateString),
        text: textMessage(team.currentEod, eodLocation, longDateString),
        html: renderHtmlMessage(team.currentEod, eodLocation, longDateString),
      }

      return await transporter.sendMail(message)
    })
  )

  return { messages, teams: teamsReadyForAnEodDelivery }
}

export default sendMessages
