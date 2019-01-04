import React from 'react'

import { MockedProvider } from 'react-apollo/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import createMother from '../../../../__test-utils__/graphql-query-mother'
import {
  baseTeam,
  createTeamMother,
} from '../../../../__test-utils__/team-mother'
import { enterText } from '../../__test-utils__/inputEvents'
import filteredArray from '../../__test-utils__/filteredArray'

import EditTeam, { GET_TEAM, EDIT_TEAM } from './EditTeam'
import Teams, { GET_TEAMS } from '../Teams/Teams'

const mockGetTeam = buildGraphQlMockForQuery(GET_TEAM)
const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)
const mockEditTeam = buildGraphQlMockForQuery(EDIT_TEAM)

const mockGetEmptyTeams = buildGraphQlMockForQuery(GET_TEAMS).returns({
  teams: [],
})

const aTeamToEdit = createMother(GET_TEAM, baseTeam)
const someTeamEdits = createTeamMother(['name', 'mailingList', 'locations'])
const anEditedTeam = createMother(EDIT_TEAM, baseTeam)
const aTeam = createMother(GET_TEAMS, baseTeam)

const TEAM_ID = '123'

const doRender = ({
  getTeamMock,
  editTeamMock,
  getTeamsMock = mockGetEmptyTeams,
}) => {
  const mocks = filteredArray(getTeamMock, editTeamMock, getTeamsMock)

  return render(
    <MemoryRouter initialEntries={[`/teams/${TEAM_ID}/edit`]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams" exact component={Teams} />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the all teams list after editing a team', async () => {
  const teamToEdit = aTeamToEdit({
    _id: TEAM_ID,
    name: 'My team',
  })
  const edits = someTeamEdits({
    ...teamToEdit,
    name: 'New team name',
  })
  const editedTeam = anEditedTeam({
    ...teamToEdit,
    ...edits,
  })
  const team = aTeam(editedTeam)

  const getTeamMock = mockGetTeam
    .withVariables({ id: TEAM_ID })
    .returns({ team: teamToEdit })

  const editTeamMock = mockEditTeam
    .withVariables({
      id: TEAM_ID,
      team: edits,
    })
    .returns({ editTeam: editedTeam })

  const getTeamsMock = mockGetTeams.returns({ teams: [team] })

  const { container, getByLabelText, getByText } = doRender({
    getTeamMock,
    editTeamMock,
    getTeamsMock,
  })

  const name = await waitForElement(() => getByLabelText('Name'))
  enterText(name, 'New team name')

  fireEvent.click(getByText('Save'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
    expect(container).toHaveTextContent('New team name')
  })
})

it('returns to the teams list on cancel', async () => {
  const team = aTeamToEdit({ _id: TEAM_ID })
  const getTeamMock = mockGetTeam
    .withVariables({ id: TEAM_ID })
    .returns({ team })

  const { container, getByLabelText, getByText } = doRender({ getTeamMock })

  await waitForElement(() => getByLabelText('Name'))
  fireEvent.click(getByText('Cancel'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})
