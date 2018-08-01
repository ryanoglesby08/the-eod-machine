import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { render, fireEvent, wait } from 'react-testing-library'

import EnterEod, { ADD_TO_EOD } from './EnterEod'

it('shows the default categories', () => {
  const { container } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <EnterEod />
    </MockedProvider>
  )

  expect(container).toHaveTextContent('Business as Usual')
  expect(container).toHaveTextContent('Story Movements')
  expect(container).toHaveTextContent('Open Questions')
  expect(container).toHaveTextContent('Blockers')
  expect(container).toHaveTextContent('Action Items')
  expect(container).toHaveTextContent('Other')
})

it('adds eod entries for the entered categories', async () => {
  const mocks = [
    {
      request: {
        query: ADD_TO_EOD,
        variables: {
          entries: [
            { category: 'Story Movements', content: 'a story movement' },
            { category: 'Blockers', content: 'a blocker' },
          ],
        },
      },
      result: {
        data: {
          addToEod: {
            entries: [
              { category: 'Story Movements', content: 'a story movement' },
              { category: 'Blockers', content: 'a blocker' },
            ],
          },
        },
      },
    },
  ]

  const { getByLabelText, getByText, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EnterEod />
    </MockedProvider>
  )

  const storyMovementsEntry = getByLabelText('Story Movements')
  storyMovementsEntry.value = 'a story movement'
  fireEvent.change(storyMovementsEntry)

  const blockersEntry = getByLabelText('Blockers')
  blockersEntry.value = 'a blocker'
  fireEvent.change(blockersEntry)

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(container).toHaveTextContent('a blocker')
    expect(container).toHaveTextContent('a story movement')
  })
})
