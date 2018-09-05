import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import {
  buildGetTeamsMock,
  buildGetTeamMock,
  buildEditTeamMock,
} from './__mocks__/teamGraphQlMocks'
import { aTeam } from './__test-utils__/team-builder'
import enterText from '../__test-utils__/enterText'

import EditTeam from './EditTeam'
import Teams from './Teams'

const doRender = mocks => {
  return render(
    <MemoryRouter initialEntries={['/teams/123/edit']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams" component={Teams} exact />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the all teams list after editing a team', async () => {
  const teamToEdit = aTeam({
    _id: '123',
    name: 'My team',
  })
  const editedTeam = {
    ...teamToEdit,
    name: 'New team name',
  }

  const getTeamMock = buildGetTeamMock(teamToEdit)
  const editTeamMock = buildEditTeamMock(editedTeam)
  const getTeamsMock = buildGetTeamsMock([editedTeam])

  const { container, getByLabelText, getByText } = doRender([
    getTeamMock,
    editTeamMock,
    getTeamsMock,
  ])

  await waitForElement(() => getByLabelText('Name'))
  enterText(getByLabelText('Name'), 'New team name')

  fireEvent.click(getByText('Save'))

  await wait(() => {
    expect(container).toHaveTextContent('All teams')
    expect(container).toHaveTextContent('New team name')
  })
})
