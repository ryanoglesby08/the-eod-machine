import gql from 'graphql-tag'
import { utcToZonedTime } from 'date-fns-tz'

import apiClient from '../apiClient'

import { getUtcTimezone } from '../time-utils/time-zone-data'
import { convertLocalTimeToUtcTime } from '../time-utils/convert'
import { toShortDate } from '../time-utils/format'

import { renderHtmlMessage } from '../multipartMessage/HtmlMessage/HtmlMessage'
import textMessage from '../multipartMessage/textMessage/textMessage'

export const GET_TEAMS_READY_FOR_EOD_DELIVERY = gql`
  query GetTeamsReadyForEodDelivery($currentTimeUtc: String!) {
    teamsReadyForAnEodDelivery(currentTimeUtc: $currentTimeUtc) {
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

const subject = (team, eodLocation, eodLocationDate) =>
  [`[EOD] ${team.name}`, eodLocation.name, toShortDate(eodLocationDate)].join(
    ' | '
  )

const sendMessages = async (transporter, currentDate, currentTimeUtc) => {
  const {
    data: { teams },
  } = await apiClient.query({ query: GET_TEAMS_READY_FOR_EOD_DELIVERY })

  return await Promise.all(
    teams.map(async team => {
      const eodLocation = getLocationAtEod(team.locations, currentTimeUtc)
      const eodLocationDate = utcToZonedTime(
        currentDate,
        getUtcTimezone(eodLocation.timeZone)
      )

      return await transporter.sendMail({
        from: {
          address: 'eod-machine@theeodmachine.local',
          name: 'EOD Machine',
        },
        to: team.mailingList,
        subject: subject(team, eodLocation, eodLocationDate),
        text: textMessage(team.currentEod, eodLocation, eodLocationDate),
        html: renderHtmlMessage(team.currentEod, eodLocation, eodLocationDate),
      })
    })
  )
}

export default sendMessages
