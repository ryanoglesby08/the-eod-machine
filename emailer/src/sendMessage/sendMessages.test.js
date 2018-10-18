import nodemailer from 'nodemailer'

import stubApiClient from '../apiClient'

import sendMessages, { GET_TEAMS_WITH_EOD } from './sendMessages'

import { aTeamWithItsEod } from '../../../__test-utils__/team-mother'

jest.mock('../apiClient')

it('sends a message to every team', async () => {
  const team = aTeamWithItsEod({
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

  const parsedMessage = JSON.parse(messages[0].message)

  expect(parsedMessage).toHaveProperty('to', [
    { address: 'team1@example.com', name: '' },
    { address: 'team2@example.com', name: '' },
  ])
  expect(parsedMessage).toHaveProperty('text', 'the text')
  expect(parsedMessage).toHaveProperty('html', 'the html')
})
