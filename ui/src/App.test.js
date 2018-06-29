import React from 'react'

import { mount } from 'enzyme'
import { MockedProvider } from 'react-apollo/lib/test-utils'

import App, { query } from './App'

it('displays the hello world message', done => {
  const mocks = [
    {
      request: {
        query,
      },
      result: {
        data: {
          hello: {
            message: 'Hello this is a test',
          },
        },
      },
    },
  ]

  const app = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

  setTimeout(() => {
    expect(app).toIncludeText(
      'The message from the API is: Hello this is a test'
    )
    done()
  })
})
