import { aTeamWithItsEod } from '../../../__test-utils__/team-mother'
import { anAuthoredEntry } from '../../../__test-utils__/entry-mother'

import renderTextMessage from './renderTextMessage'

it('is an EOD message as plain text', () => {
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

  const message = renderTextMessage(team)

  expect(message).toMatchSnapshot()
})

it('is an empty EOD message when there are no entries', () => {
  const team = aTeamWithItsEod({
    currentEod: [],
  })

  const message = renderTextMessage(team)

  expect(message).toMatchSnapshot()
})
