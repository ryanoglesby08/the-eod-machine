import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import {
  buildGetTeamsMock,
  buildGetEmptyTeamsMock,
  buildGetTeamMock,
  buildEditTeamMock,
} from '../__mocks__/teamGraphQlMocks'
import { aTeam } from '../__test-utils__/team-builder'
import enterText from '../../__test-utils__/enterText'
import filteredArray from '../../__test-utils__/filteredArray'

import EditTeam from './EditTeam'
import Teams from '../Teams/Teams'

const TEST_ID = '123'
const doRender = ({
  getTeamMock = buildGetTeamMock(aTeam({ _id: TEST_ID })),
  editTeamMock,
  getTeamsMock = buildGetEmptyTeamsMock(),
}) => {
  const mocks = filteredArray(getTeamMock, editTeamMock, getTeamsMock)

  return render(
    <MemoryRouter initialEntries={[`/teams/${TEST_ID}/edit`]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams" component={Teams} exact />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the all teams list after editing a team', async () => {
  const teamToEdit = aTeam({
    _id: TEST_ID,
    name: 'My team',
  })
  const editedTeam = {
    ...teamToEdit,
    name: 'New team name',
  }

  const getTeamMock = buildGetTeamMock(teamToEdit)
  const editTeamMock = buildEditTeamMock(editedTeam)
  const getTeamsMock = buildGetTeamsMock([editedTeam])

  const { container, getByLabelText, getByText } = doRender({
    getTeamMock,
    editTeamMock,
    getTeamsMock,
  })

  await waitForElement(() => getByLabelText('Name'))
  enterText(getByLabelText('Name'), 'New team name')

  fireEvent.click(getByText('Save'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
    expect(container).toHaveTextContent('New team name')
  })
})

it('returns to the teams list on cancel', async () => {
  const { container, getByLabelText, getByText } = doRender({})

  await waitForElement(() => getByLabelText('Name'))
  fireEvent.click(getByText('Cancel'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
  })
})
