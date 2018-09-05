import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait } from 'react-testing-library'

import {
  buildCreateTeamMock,
  buildGetTeamsMock,
} from '../__mocks__/teamGraphQlMocks'
import { aTeam } from '../__test-utils__/team-builder'
import enterText from '../../__test-utils__/enterText'

import NewTeam from './NewTeam'
import Teams from '../Teams/Teams'

const doRender = mocks => {
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
  const teamToCreate = aTeam({
    name: 'My team',
    mailingList: ['team@example.com', 'another@example.com'],
  })

  const createTeamMock = buildCreateTeamMock(teamToCreate)
  const getTeamsMock = buildGetTeamsMock([teamToCreate])

  const { container, getByLabelText, getByText } = doRender([
    createTeamMock,
    getTeamsMock,
  ])

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
