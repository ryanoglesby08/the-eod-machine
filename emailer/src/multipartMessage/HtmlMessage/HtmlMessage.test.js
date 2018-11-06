import React from 'react'

import { render } from 'react-testing-library'

import { aTeamWithItsEod } from '../../../../__test-utils__/team-mother'
import { anAuthoredEntry } from '../../../../__test-utils__/entry-mother'

import HtmlMessage from './HtmlMessage'

it('is an EOD message', () => {
  const team = aTeamWithItsEod({
    currentEod: [
      anAuthoredEntry({
        author: 'Some author',
        category: 'Category 1',
        content: 'some content',
      }),
      anAuthoredEntry({
        author: 'Another author',
        category: 'Category 1',
        content: 'more content',
      }),
      anAuthoredEntry({
        author: 'Some author',
        category: 'Category 2',
        content: 'even more content',
      }),
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
