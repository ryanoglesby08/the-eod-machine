import React from 'react'

import { render } from 'react-testing-library'

import { aTeamWithItsEod } from '../../../../__test-utils__/team-mother'

import HtmlMessage from './HtmlMessage'

it('is an EOD message', async () => {
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
