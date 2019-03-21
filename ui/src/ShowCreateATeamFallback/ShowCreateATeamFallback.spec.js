import React from 'react'

import { render } from 'react-testing-library'

import ShowCreateATeamFallback from './ShowCreateATeamFallback'

it('shows the create a team message if teams is not defined', () => {
  const { container } = render(
    <ShowCreateATeamFallback teams={undefined}>
      {teams => <div>There are {teams.length} teams</div>}
    </ShowCreateATeamFallback>
  )

  expect(container).toHaveTextContent(
    "You'll need to create a team before you can enter an EOD update."
  )
})

it('shows the create a team message if there are no teams', () => {
  const { container } = render(
    <ShowCreateATeamFallback teams={[]}>
      {teams => <div>There are {teams.length} teams</div>}
    </ShowCreateATeamFallback>
  )

  expect(container).toHaveTextContent(
    "You'll need to create a team before you can enter an EOD update."
  )
})

it('renders when there are teams', () => {
  const { container } = render(
    <ShowCreateATeamFallback teams={['a team', 'another team']}>
      {teams => <div>There are {teams.length} teams</div>}
    </ShowCreateATeamFallback>
  )

  expect(container).toHaveTextContent('There are 2 teams')
})
