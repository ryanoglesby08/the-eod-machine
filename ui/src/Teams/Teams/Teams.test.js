import React from 'react'

import { MockedProvider } from 'react-apollo/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, wait } from 'react-testing-library'

import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import createMother from '../../../../__test-utils__/graphql-query-mother'
import { baseTeam } from '../../../../__test-utils__/team-mother'

import Teams, { GET_TEAMS } from './Teams'

const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)
const aTeam = createMother(GET_TEAMS, baseTeam)

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
  const getTeamsMock = mockGetTeams.returns({
    teams: [
      aTeam({ name: 'The first team' }),
      aTeam({ name: 'The second team' }),
    ],
  })

  const { container } = doRender([getTeamsMock])

  await wait(() => {
    expect(container).toHaveTextContent('The first team')
    expect(container).toHaveTextContent('The second team')
  })
})
