import React from 'react'

import { MockedProvider } from 'react-apollo/lib/test-utils'
import { render, fireEvent, wait } from 'react-testing-library'

import {
  buildMockGetEod,
  buildMockGetEmptyEod,
  buildMockAddToEod,
} from './__mocks__/graphQlMocks'

import EnterEod from './EnterEod'

const enterText = (component, value) => {
  component.value = value
  fireEvent.change(component)
}

const doRender = ({ getEodMock, addToEodMock } = {}) => {
  const mocks = [getEodMock || buildMockGetEmptyEod()].concat(
    addToEodMock || []
  )

  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EnterEod />
    </MockedProvider>
  )
}

it('shows the default categories', () => {
  const { container } = doRender()

  expect(container).toHaveTextContent('Business as Usual')
  expect(container).toHaveTextContent('Story Movements')
  expect(container).toHaveTextContent('Open Questions')
  expect(container).toHaveTextContent('Blockers')
  expect(container).toHaveTextContent('Action Items')
  expect(container).toHaveTextContent('Other')
})

it('shows the current EOD', async () => {
  const getEodMock = buildMockGetEod([
    { category: 'Story Movements', content: 'a story movement' },
    { category: 'Blockers', content: 'a blocker' },
  ])

  const { getByTestId } = doRender({ getEodMock })

  await wait(() => {
    expect(getByTestId('story-movements')).toHaveTextContent('a story movement')
    expect(getByTestId('blockers')).toHaveTextContent('a blocker')
  })
})

it('saves eod entries for the entered categories', async () => {
  const addToEodMock = buildMockAddToEod([
    { category: 'Blockers', content: 'new blocker' },
    { category: 'Action Items', content: 'new action item' },
  ])

  const { getByLabelText, getByText, getByTestId } = doRender({ addToEodMock })

  enterText(getByLabelText('Blockers'), 'new blocker')
  enterText(getByLabelText('Action Items'), 'new action item')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByTestId('blockers')).toHaveTextContent('new blocker')
    expect(getByTestId('action-items')).toHaveTextContent('new action item')
  })
})

it('does not submit empty entries', async () => {
  const addToEodMock = buildMockAddToEod([
    { category: 'Blockers', content: 'new blocker' },
  ])

  const { getByLabelText, getByTestId, getByText } = doRender({ addToEodMock })

  enterText(getByLabelText('Blockers'), 'new blocker')
  enterText(getByLabelText('Action Items'), '')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByTestId('blockers')).toHaveTextContent('new blocker')
  })
})

it('clears entries after submitting', async () => {
  const addToEodMock = buildMockAddToEod([
    { category: 'Blockers', content: 'new blocker' },
  ])

  const { getByLabelText, getByText } = doRender({ addToEodMock })

  enterText(getByLabelText('Blockers'), 'new blocker')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByLabelText('Blockers')).toBeEmpty()
  })
})
