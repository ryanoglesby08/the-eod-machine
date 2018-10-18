import { aTeamWithItsEod } from '../../../__test-utils__/team-mother'

import renderTextMessage from './renderTextMessage'

it('is an EOD message as plain text', async () => {
  const team = aTeamWithItsEod({
    currentEod: [
      { category: 'Category 1', content: 'some content' },
      { category: 'Category 1', content: 'more content' },
      { category: 'Category 2', content: 'even more content' },
    ],
  })

  const message = await renderTextMessage(team)

  expect(message).toMatchSnapshot()
})
