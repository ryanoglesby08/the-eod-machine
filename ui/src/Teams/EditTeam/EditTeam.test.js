import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import { omit } from 'lodash'

import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import { aTeam } from '../__test-utils__/team-builder'
import enterText from '../../__test-utils__/enterText'
import filteredArray from '../../__test-utils__/filteredArray'

import EditTeam, { GET_TEAM, EDIT_TEAM } from './EditTeam'
import Teams, { GET_TEAMS } from '../Teams/Teams'

const mockGetTeam = buildGraphQlMockForQuery(GET_TEAM)
const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)
const mockEditTeam = buildGraphQlMockForQuery(EDIT_TEAM)

const mockGetEmptyTeams = buildGraphQlMockForQuery(GET_TEAMS).returns({
  teams: [],
})

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
        <Route path="/teams" component={Teams} exact />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the all teams list after editing a team', async () => {
  const teamToEdit = aTeam({
    _id: TEAM_ID,
    name: 'My team',
  })
  const editedTeam = {
    ...teamToEdit,
    name: 'New team name',
  }

  const getTeamMock = mockGetTeam
    .withVariables({ id: teamToEdit._id })
    .returns({ team: teamToEdit })

  const editTeamMock = mockEditTeam
    .withVariables({
      id: TEAM_ID,
      team: omit(editedTeam, '_id'),
    })
    .returns({ editTeam: editedTeam })

  const getTeamsMock = mockGetTeams.returns({ teams: [editedTeam] })

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
  const team = aTeam({ _id: TEAM_ID })
  const getTeamMock = mockGetTeam
    .withVariables({ id: team._id })
    .returns({ team })

  const { container, getByLabelText, getByText } = doRender({ getTeamMock })

  await waitForElement(() => getByLabelText('Name'))
  fireEvent.click(getByText('Cancel'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})
