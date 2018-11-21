import React from 'react'

import { MockedProvider } from 'react-apollo/test-utils'
import { CookiesProvider, Cookies } from 'react-cookie'
import { render, fireEvent, wait, waitForElement } from 'react-testing-library'

import {
  someEntryInputAndAuthoredEntry,
  anAuthoredEntry,
} from '../../../../__test-utils__/entry-mother'
import { createTeamBuilder } from '../../../../__test-utils__/team-mother'
import enterText from '../../__test-utils__/enterText'
import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import filteredArray from '../../__test-utils__/filteredArray'

import EnterEod from './EnterEod'
import { GET_TEAM_WITH_EOD } from './FetchTeamWithEod'
import { ADD_TO_EOD } from './EodForm'

const TEAM_ID = 'team-1'

const aTeamWithEod = createTeamBuilder(['name', 'currentEod'])

const mockGetTeamWithEod = buildGraphQlMockForQuery(GET_TEAM_WITH_EOD)
const mockAddToEod = buildGraphQlMockForQuery(ADD_TO_EOD)

const mockGetTeamWithEmptyEod = mockGetTeamWithEod
  .withVariables({ id: TEAM_ID })
  .returns({ team: aTeamWithEod({ currentEod: [] }) })

const doRender = async ({
  getTeamWithEodMock = mockGetTeamWithEmptyEod,
  addToEodMock,
} = {}) => {
  const mocks = filteredArray(getTeamWithEodMock, addToEodMock)

  const renderResult = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CookiesProvider cookies={cookies}>
        <EnterEod />
      </CookiesProvider>
    </MockedProvider>
  )

  await waitForElement(() => renderResult.getByText(/Enter your EOD update/))

  return renderResult
}

let cookies

beforeEach(() => {
  cookies = new Cookies()
  cookies.set('team', TEAM_ID)
})

it('shows the default categories', async () => {
  const { container } = await doRender()

  expect(container).toHaveTextContent('Business as Usual')
  expect(container).toHaveTextContent('Story Movements')
  expect(container).toHaveTextContent('Open Questions')
  expect(container).toHaveTextContent('Blockers')
  expect(container).toHaveTextContent('Action Items')
  expect(container).toHaveTextContent('Other')
})

it("shows the current team's name", async () => {
  const getTeamWithEodMock = mockGetTeamWithEod
    .withVariables({ id: TEAM_ID })
    .returns({
      team: aTeamWithEod({ name: 'My team' }),
    })

  const { container } = await doRender({ getTeamWithEodMock })

  expect(container).toHaveTextContent('My team')
})

it("shows the current team's EOD", async () => {
  const getTeamWithEodMock = mockGetTeamWithEod
    .withVariables({ id: TEAM_ID })
    .returns({
      team: aTeamWithEod({
        currentEod: [
          anAuthoredEntry({
            author: 'Harry Potter',
            category: 'Story Movements',
            content: 'a story movement',
          }),
          anAuthoredEntry({
            author: 'Harry Potter',
            category: 'Blockers',
            content: 'a blocker',
          }),
        ],
      }),
    })

  const { getByTestId } = await doRender({ getTeamWithEodMock })

  expect(getByTestId('story-movements')).toHaveTextContent('Harry Potter')
  expect(getByTestId('story-movements')).toHaveTextContent('a story movement')
  expect(getByTestId('blockers')).toHaveTextContent('Harry Potter')
  expect(getByTestId('blockers')).toHaveTextContent('a blocker')
})

it('saves eod entries for the entered categories', async () => {
  const entry1 = someEntryInputAndAuthoredEntry({
    author: 'Ron Weaseley',
    category: 'Blockers',
    content: 'new blocker',
  })
  const entry2 = someEntryInputAndAuthoredEntry({
    author: 'Ron Weaseley',
    category: 'Action Items',
    content: 'new action item',
  })

  const addToEodMock = mockAddToEod
    .withVariables({
      author: 'Ron Weaseley',
      entries: [entry1.entryInput, entry2.entryInput],
      teamId: TEAM_ID,
    })
    .returns({ addToEod: [entry1.authoredEntry, entry2.authoredEntry] })

  const { getByLabelText, getByText, getByTestId } = await doRender({
    addToEodMock,
  })

  enterText(getByLabelText('Author'), 'Ron Weaseley')

  enterText(getByLabelText('Blockers'), 'new blocker')
  enterText(getByLabelText('Action Items'), 'new action item')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByTestId('blockers')).toHaveTextContent('Ron Weaseley')
    expect(getByTestId('blockers')).toHaveTextContent('new blocker')
    expect(getByTestId('action-items')).toHaveTextContent('Ron Weaseley')
    expect(getByTestId('action-items')).toHaveTextContent('new action item')
  })
})

it('does not submit empty entries', async () => {
  const entry = someEntryInputAndAuthoredEntry({
    author: 'Hermoine Grainger',
    category: 'Blockers',
    content: 'new blocker',
  })
  const addToEodMock = mockAddToEod
    .withVariables({
      author: 'Hermoine Grainger',
      entries: [entry.entryInput],
      teamId: TEAM_ID,
    })
    .returns({ addToEod: [entry.authoredEntry] })

  const { getByLabelText, getByTestId, getByText } = await doRender({
    addToEodMock,
  })

  enterText(getByLabelText('Author'), 'Hermoine Grainger')

  enterText(getByLabelText('Blockers'), 'new blocker')
  enterText(getByLabelText('Action Items'), '')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByTestId('blockers')).toHaveTextContent('new blocker')
  })
})

it('clears the form after submitting', async () => {
  const entry = someEntryInputAndAuthoredEntry({
    author: 'Jon Snow',
    category: 'Blockers',
    content: 'new blocker',
  })
  const addToEodMock = mockAddToEod
    .withVariables({
      author: 'Jon Snow',
      entries: [entry.entryInput],
      teamId: TEAM_ID,
    })
    .returns({ addToEod: [entry.authoredEntry] })

  const { getByLabelText, getByText } = await doRender({ addToEodMock })

  enterText(getByLabelText('Author'), 'Jon Snow')

  enterText(getByLabelText('Blockers'), 'new blocker')

  fireEvent.click(getByText('Submit'))

  await wait(() => {
    expect(getByLabelText('Author')).toHaveAttribute('value', '')
    expect(getByLabelText('Blockers')).toBeEmpty()
  })
})
