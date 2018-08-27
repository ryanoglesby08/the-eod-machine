import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, wait } from 'react-testing-library'

import { buildGetTeamsMock } from './__mocks__/teamGraphQlMocks'
import { aTeam } from './__test-utils__/team-builder'

import Teams from './Teams'

const doRender = mocks => {
  return render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route component={Teams} />
      </MockedProvider>
    </MemoryRouter>
  )
}

it('shows all the teams', async () => {
  const getTeamsMock = buildGetTeamsMock([
    aTeam({ name: 'The first team' }),
    aTeam({ name: 'The second team' }),
  ])
  const { container } = doRender([getTeamsMock])

  await wait(() => {
    expect(container).toHaveTextContent('The first team')
    expect(container).toHaveTextContent('The second team')
  })
})
