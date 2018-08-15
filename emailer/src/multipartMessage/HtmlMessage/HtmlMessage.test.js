import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { render, waitForElement } from 'react-testing-library'

import GET_EOD from '../getEodQuery'
import EodMessage from './HtmlMessage'

it('is an EOD message', async () => {
  const mocks = [
    {
      request: {
        query: GET_EOD,
      },
      result: {
        data: {
          eod: {
            entries: [
              { category: 'Category 1', content: 'some content' },
              { category: 'Category 1', content: 'more content' },
              { category: 'Category 2', content: 'even more content' },
            ],
          },
        },
      },
    },
  ]

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EodMessage />
    </MockedProvider>
  )

  await waitForElement()

  expect(container).toMatchSnapshot()
})
