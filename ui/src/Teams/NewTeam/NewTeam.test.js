import React from 'react'

import { MockedProvider } from 'react-apollo/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait } from 'react-testing-library'

import createMother from '../../../../__test-utils__/graphql-query-mother'
import {
  baseTeam,
  createTeamMother,
} from '../../../../__test-utils__/team-mother'
import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import filteredArray from '../../__test-utils__/filteredArray'
import fillInTeamForm from '../__test-utils__/fillInTeamForm'

import NewTeam, { CREATE_TEAM } from './NewTeam'
import Teams, { GET_TEAMS } from '../Teams/Teams'

const mockCreateTeam = buildGraphQlMockForQuery(CREATE_TEAM)
const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)

const mockGetEmptyTeams = mockGetTeams.returns({
  teams: [],
})

const someNewTeamInput = createTeamMother(['name', 'mailingList', 'locations'])
const aCreatedTeam = createMother(CREATE_TEAM, baseTeam)

const doRender = ({
  createTeamMock,
  getTeamsMock = mockGetEmptyTeams,
} = {}) => {
  const mocks = filteredArray(createTeamMock, getTeamsMock)

  const renderQueries = render(
    <MemoryRouter initialEntries={['/teams/new']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams/new" component={NewTeam} />
        <Route path="/teams" component={Teams} exact />
      </MockedProvider>
    </MemoryRouter>
  )

  return { ...renderQueries, fillInTeamForm: fillInTeamForm(renderQueries) }
}

it('shows the all teams list after creating a new team', async () => {
  const input = someNewTeamInput({
    name: 'My team',
    mailingList: ['team@example.com', 'another@example.com'],
    locations: [
      {
        name: 'The first city',
        timeZone: 'Hawaiian Standard Time',
        eodTime: '6:00 PM',
      },
      {
        name: 'The second city',
        timeZone: 'Egypt Standard Time',
        eodTime: '7:00 PM',
      },
    ],
  })
  const teamToCreate = aCreatedTeam(input)

  const createTeamMock = mockCreateTeam
    .withVariables({ team: input })
    .returns({ createTeam: teamToCreate })

  const { container, fillInTeamForm } = doRender({
    createTeamMock,
  })

  fillInTeamForm({
    Name: 'My team',
    'Mailing list': 'team@example.com, another@example.com',
    locations: [
      {
        Name: 'The first city',
        'Time zone': 'hawaii',
        'EOD time': '6:00 PM',
      },
      {
        Name: 'The second city',
        'Time zone': 'egypt',
        'EOD time': '7:00 PM',
      },
    ],
  })

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})

it('returns to the teams list on cancel', async () => {
  const { container, getByText } = doRender()

  fireEvent.click(getByText('Cancel'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})
