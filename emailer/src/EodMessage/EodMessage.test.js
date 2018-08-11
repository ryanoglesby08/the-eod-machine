import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { render, waitForElement } from 'react-testing-library'

import EodMessage, { GET_EOD } from './EodMessage'

it('is an EOD message', async () => {
  const mocks = [
    {
      request: {
        query: GET_EOD,
      },
      result: {
        data: {
          eod: {
            entries: [{ category: 'Test category', content: 'test content' }],
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
