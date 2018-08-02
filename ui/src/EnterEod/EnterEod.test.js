import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { render, fireEvent, within, wait } from 'react-testing-library'

import EnterEod, { ADD_TO_EOD, GET_EOD } from './EnterEod'

const buildMockGetEod = entries => ({
  request: {
    query: GET_EOD,
  },
  result: {
    data: {
      eod: {
        entries,
      },
    },
  },
})

const buildMockAddToEod = entries => ({
  request: {
    query: ADD_TO_EOD,
    variables: {
      entries,
    },
  },
  result: {
    data: {
      addToEod: entries,
    },
  },
})

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

it('shows the current EOD', async () => {
  const mocks = [
    buildMockGetEod([
      { category: 'Story Movements', content: 'a story movement' },
      { category: 'Blockers', content: 'a blocker' },
    ]),
  ]

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EnterEod />
    </MockedProvider>
  )

  await wait(() => {
    expect(container).toHaveTextContent('a story movement')
    expect(container).toHaveTextContent('a blocker')
  })
})

it('adds eod entries for the entered categories', async () => {
  const mocks = [
    buildMockGetEod([
      { category: 'Story Movements', content: 'initial story movement' },
    ]),
    buildMockAddToEod([
      { category: 'Blockers', content: 'new blocker' },
      { category: 'Action Items', content: 'new action item' },
    ]),
  ]

  const { getByLabelText, getByText, getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EnterEod />
    </MockedProvider>
  )

  const storyMovementsEntry = getByLabelText('Blockers')
  storyMovementsEntry.value = 'new blocker'
  fireEvent.change(storyMovementsEntry)

  const actionItemEntry = getByLabelText('Action Items')
  actionItemEntry.value = 'new action item'
  fireEvent.change(actionItemEntry)

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    const blockersEntries = getByTestId('Blockers')
    expect(blockersEntries).toHaveTextContent('new blocker')

    const actionItemsEntries = getByTestId('Action Items')
    expect(actionItemsEntries).toHaveTextContent('new action item')
  })
})
