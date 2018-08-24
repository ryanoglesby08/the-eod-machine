import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, fireEvent, wait } from 'react-testing-library'

import {
  buildCreateTeamMock,
  buildMockGetTeam,
} from './__mocks__/teamGraphQlMocks'

import NewTeam from './NewTeam'
import EditTeam from './EditTeam'

const enterText = (component, value) =>
  fireEvent.change(component, { target: { value } })

const doRender = mocks => {
  return render(
    <MemoryRouter initialEntries={['/teams/new']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route path="/teams/new" component={NewTeam} />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows the edit team form after creating a new team', async () => {
  const createTeamMock = buildCreateTeamMock({
    name: 'My team',
    mailingList: ['team@example.com', 'another@example.com'],
  })
  const getTeamMock = buildMockGetTeam({
    _id: '123',
    name: 'My team',
    mailingList: ['team@example.com', 'another@example.com'],
  })

  const { container, getByLabelText, getByText } = doRender([
    createTeamMock,
    getTeamMock,
  ])

  enterText(getByLabelText('Name'), 'My team')
  enterText(
    getByLabelText('Mailing list'),
    'team@example.com, another@example.com'
  )

  fireEvent.click(getByText('Save'))

  await wait(() => {
    expect(container).toHaveTextContent('Editing team "My team"')
  })
})
