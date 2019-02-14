import nodemailer from 'nodemailer'

import createMother from '../../../__test-utils__/graphql-query-mother'
import { baseTeam } from '../../../__test-utils__/team-mother'
import { createLocationMother } from '../../../__test-utils__/location-mother'

import stubApiClient from '../apiClient'

import { convertLocalTimeToUtcTime } from '../time-utils/convert'
import sendMessages, { GET_TEAMS_READY_FOR_EOD_DELIVERY } from './sendMessages'

jest.mock('../apiClient')

const aTeamWithItsEod = createMother(GET_TEAMS_READY_FOR_EOD_DELIVERY, baseTeam)
const aLocation = createLocationMother(['name', 'timeZone', 'eodTime'])

let transporter

beforeEach(() => {
  transporter = nodemailer.createTransport({
    jsonTransport: true,
  })
})

it('sends a message to teams that are ready for an EOD', async () => {
  const team = aTeamWithItsEod({
    name: 'The Team',
    mailingList: ['team1@example.com', 'team2@example.com'],
    locations: [
      aLocation({
        name: 'Denver',
        timeZone: 'Mountain Standard Time',
        eodTime: '5:00 PM',
      }),
      aLocation({
        name: 'New York',
        timeZone: 'Eastern Standard Time',
        eodTime: '8:00 PM',
      }),
    ],
  })

  stubApiClient.__stubQuery(GET_TEAMS_READY_FOR_EOD_DELIVERY, {
    teams: [team],
  })

  const currentDate = new Date(2019, 1, 3, 12) // Feb 3, 2019 @ 12pm UTC
  const currentTimeUtc = convertLocalTimeToUtcTime('5:00 PM', 'America/Denver')

  const messages = await sendMessages(
    // TODO: don't pass transporter as a param, just use module mocking
    transporter,
    currentDate,
    currentTimeUtc
  )

  expect(messages).toHaveLength(1)

  const eodMessage = JSON.parse(messages[0].message)

  expect(eodMessage).toHaveProperty('from', {
    address: 'eod-machine@theeodmachine.local',
    name: 'EOD Machine',
  })
  expect(eodMessage).toHaveProperty('to', [
    { address: 'team1@example.com', name: '' },
    { address: 'team2@example.com', name: '' },
  ])
  // TODO: Test for reply to field
  expect(eodMessage).toHaveProperty(
    'subject',
    '[EOD] The Team | Denver | Feb 03'
  )

  expect(eodMessage.text).toMatchSnapshot()
  expect(eodMessage.html).toMatchSnapshot()
})

// TODO: Next test
//it('rounds to the nearest half hour to account for small time differences when the emailer runs', () => {})
// round to nearest half hour => (Math.round(<current minutes> / 30) * 30) % 60
