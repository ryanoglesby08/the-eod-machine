import nodemailer from 'nodemailer'

import stubApiClient from '../apiClient'

import sendMessages, { GET_TEAMS_WITH_EOD } from './sendMessages'

import { aTeamWithItsEod } from '../../../__test-utils__/team-mother'

jest.mock('../apiClient')

it('sends a message to every team', async () => {
  const team = aTeamWithItsEod({
    name: 'The Team',
    mailingList: ['team1@example.com', 'team2@example.com'],
  })

  stubApiClient.__stubQuery(GET_TEAMS_WITH_EOD, {
    teams: [team],
  })

  const renderTextMessage = jest.fn().mockImplementation(() => 'the text')
  const renderHtmlMessage = jest.fn().mockImplementation(() => 'the html')

  const transporter = nodemailer.createTransport({
    jsonTransport: true,
  })

  const messages = await sendMessages(
    transporter,
    renderTextMessage,
    renderHtmlMessage
  )

  expect(renderTextMessage).toHaveBeenCalledWith(team)
  expect(renderHtmlMessage).toHaveBeenCalledWith(team)

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
  expect(eodMessage).toHaveProperty('subject', '[EOD] The Team')

  expect(eodMessage).toHaveProperty('text', 'the text')
  expect(eodMessage).toHaveProperty('html', 'the html')
})
