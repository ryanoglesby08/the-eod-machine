import React from 'react'

import { render } from 'react-testing-library'

import { anAuthoredEntry } from '../../../../__test-utils__/entry-mother'
import { aLocation } from '../../../../__test-utils__/location-mother'

import HtmlMessage from './HtmlMessage'

it('is an EOD message', () => {
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
  const eodLocationDate = 'Feb 10, 2019'

  const { container } = render(
    <HtmlMessage
      entries={currentEod}
      eodLocation={eodLocation}
      eodLocationDate={eodLocationDate}
    />
  )

  expect(container).toMatchSnapshot()
})

it('is an empty EOD message when there are no entries', () => {
  const eodLocation = aLocation({ name: 'Chicago' })
  const eodLocationDate = 'Feb 10, 2019'

  const { container } = render(
    <HtmlMessage
      entries={[]}
      eodLocation={eodLocation}
      eodLocationDate={eodLocationDate}
    />
  )

  expect(container).toMatchSnapshot()
})
