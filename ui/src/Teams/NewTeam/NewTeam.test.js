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
import enterText from '../../__test-utils__/enterText'
import filteredArray from '../../__test-utils__/filteredArray'

import NewTeam, { CREATE_TEAM } from './NewTeam'
import Teams, { GET_TEAMS } from '../Teams/Teams'

const mockCreateTeam = buildGraphQlMockForQuery(CREATE_TEAM)
const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)

const mockGetEmptyTeams = buildGraphQlMockForQuery(GET_TEAMS).returns({
  teams: [],
})

const someNewTeamInput = createTeamMother(['name', 'mailingList'])
const aCreatedTeam = createMother(CREATE_TEAM, baseTeam)
const aTeam = createMother(GET_TEAMS, baseTeam)

const doRender = ({ createTeamMock, getTeamsMock = mockGetEmptyTeams }) => {
  const mocks = filteredArray(createTeamMock, getTeamsMock)

  return render(
    <MemoryRouter initialEntries={['/teams/new']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams/new" component={NewTeam} />
        <Route path="/teams" component={Teams} exact />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the all teams list after creating a new team', async () => {
  const input = someNewTeamInput({
    name: 'My team',
    mailingList: ['team@example.com', 'another@example.com'],
  })
  const teamToCreate = aCreatedTeam(input)
  const returnedTeam = aTeam(teamToCreate)

  const createTeamMock = mockCreateTeam
    .withVariables({ team: input })
    .returns({ createTeam: teamToCreate })
  const getTeamsMock = mockGetTeams.returns({ teams: [returnedTeam] })

  const { container, getByLabelText, getByText } = doRender({
    createTeamMock,
    getTeamsMock,
  })

  enterText(getByLabelText('Name'), 'My team')
  enterText(
    getByLabelText('Mailing list'),
    'team@example.com, another@example.com'
  )

  fireEvent.click(getByText('Save'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
    expect(container).toHaveTextContent('My team')
  })
})

it('returns to the teams list on cancel', async () => {
  const { container, getByText } = doRender({})

  fireEvent.click(getByText('Cancel'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})
