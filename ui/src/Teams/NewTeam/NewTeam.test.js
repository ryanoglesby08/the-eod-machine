import React from 'react'

import { MockedProvider } from 'react-apollo/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait, within } from 'react-testing-library'

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

const mockGetEmptyTeams = mockGetTeams.returns({
  teams: [],
})

const someNewTeamInput = createTeamMother(['name', 'mailingList', 'locations'])
const aCreatedTeam = createMother(CREATE_TEAM, baseTeam)
const aTeam = createMother(GET_TEAMS, baseTeam)

const doRender = ({
  createTeamMock,
  getTeamsMock = mockGetEmptyTeams,
} = {}) => {
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
    locations: [{ name: 'The first city' }, { name: 'The second city' }],
  })
  const teamToCreate = aCreatedTeam(input)

  const createTeamMock = mockCreateTeam
    .withVariables({ team: input })
    .returns({ createTeam: teamToCreate })

  const { container, getByLabelText, getByText, getByTestId } = doRender({
    createTeamMock,
  })

  enterText(getByLabelText('Name'), 'My team')
  enterText(
    getByLabelText('Mailing list'),
    'team@example.com, another@example.com'
  )
  const location1 = within(getByTestId('location-0'))
  enterText(location1.getByLabelText('Name'), 'The first city')
  const location2 = within(getByTestId('location-1'))
  enterText(location2.getByLabelText('Name'), 'The second city')

  fireEvent.click(getByText('Save'))

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
