import React from 'react'

import { render } from 'react-testing-library'

import { aTeamWithItsEod } from '../../../../__test-utils__/team-mother'

import HtmlMessage from './HtmlMessage'

it('is an EOD message', () => {
  const team = aTeamWithItsEod({
    currentEod: [
      { category: 'Category 1', content: 'some content' },
      { category: 'Category 1', content: 'more content' },
      { category: 'Category 2', content: 'even more content' },
    ],
  })

  const { container } = render(<HtmlMessage entries={team.currentEod} />)

  expect(container).toMatchSnapshot()
})

it('is an empty EOD message when there are no entries', () => {
  const team = aTeamWithItsEod({
    currentEod: [],
  })

  const { container } = render(<HtmlMessage entries={team.currentEod} />)

  expect(container).toMatchSnapshot()
})
