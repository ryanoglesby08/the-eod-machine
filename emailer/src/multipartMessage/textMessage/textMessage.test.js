import { anAuthoredEntry } from '../../../../__test-utils__/entry-mother'
import { aLocation } from '../../../../__test-utils__/location-mother'

import textMessage from './textMessage'

it('is an EOD message as plain text', () => {
  const currentEod = [
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
  ]
  const eodLocation = aLocation({ name: 'Chicago' })
  const eodLocationDate = new Date(2019, 2, 10)

  const message = textMessage(currentEod, eodLocation, eodLocationDate)

  expect(message).toMatchSnapshot()
})

it('is an empty EOD message when there are no entries', () => {
  const eodLocation = aLocation({ name: 'Chicago' })
  const eodLocationDate = new Date(2019, 2, 10)

  const message = textMessage([], eodLocation, eodLocationDate)

  expect(message).toMatchSnapshot()
})
