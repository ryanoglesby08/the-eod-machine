import React from 'react'
import { CookiesProvider, Cookies } from 'react-cookie'
import { MockedProvider } from 'react-apollo/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'

import { render, wait, fireEvent, waitForElement } from 'react-testing-library'

import buildGraphQlMockForQuery from '../../__test-utils__/GraphQlMock'
import createMother from '../../../../__test-utils__/graphql-query-mother'
import { baseTeam } from '../../../../__test-utils__/team-mother'

import { GET_TEAMS } from './FetchTeams'
import SelectTeam from './SelectTeam'
import TeamRequiredRoute from './TeamRequiredRoute'

const mockGetTeams = buildGraphQlMockForQuery(GET_TEAMS)

const aTeam = createMother(GET_TEAMS, baseTeam)

const ShowSelectedTeamId = ({ teamId }) => (
  <div>Selected team id is {teamId}</div>
)

const doRender = ({ getTeamsMock }, cookies) => {
  const mocks = [getTeamsMock]

  return render(
    <MemoryRouter initialEntries={['/']}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CookiesProvider cookies={cookies}>
          <TeamRequiredRoute path="/" exact component={ShowSelectedTeamId} />
          {/* Use `render` instead of `component` to prevent a silly warning from `Route` component and `withCookies` */}
          {/* PropTypes warning will be fixed in react-router 4.4. https://github.com/ReactTraining/react-router/issues/4354 */}
          <Route path="/select-team" render={() => <SelectTeam />} />
        </CookiesProvider>
      </MockedProvider>
    </MemoryRouter>
  )
}

let cookies

beforeEach(() => {
  cookies = new Cookies()
})

afterEach(() => {
  cookies.remove('team')
})

describe('when a team has already been selected', () => {
  it('skips the team selector', async () => {
    cookies.set('team', 'id-111')
    const getTeamsMock = mockGetTeams.returns({
      teams: [aTeam({ _id: 'id-111', name: 'First team' })],
    })

    const { container } = doRender({ getTeamsMock }, cookies)

    await wait(() => {
      expect(container).toHaveTextContent('Selected team id is id-111')
    })
  })

  it('requires you to choose a new team when yours does not exist', async () => {
    cookies.set('team', '211')
    const getTeamsMock = mockGetTeams.returns({
      teams: [aTeam({ _id: 'id-222', name: 'First team' })],
    })

    const { container, getByText } = doRender({ getTeamsMock }, cookies)

    await wait(() =>
      expect(container).toHaveTextContent(/team you've selected doesn't exist/)
    )
    fireEvent.click(getByText('First team'))

    expect(container).toHaveTextContent('Selected team id is id-222')
    expect(cookies.get('team')).toEqual('id-222')
  })
})

describe("when a team hasn't already been selected", () => {
  it('shows the team selector', async () => {
    const getTeamsMock = mockGetTeams.returns({
      teams: [aTeam({ name: 'First team' }), aTeam({ name: 'Second team' })],
    })
    const { container } = doRender({ getTeamsMock }, cookies)

    await wait(() => {
      expect(container).toHaveTextContent(
        'Choose a team to receive your EOD update'
      )
      expect(container).toHaveTextContent('First team')
      expect(container).toHaveTextContent('Second team')
    })
  })

  it('requires you to choose a team', async () => {
    const getTeamsMock = mockGetTeams.returns({
      teams: [aTeam({ _id: 'id-333', name: 'First team' })],
    })
    const { container, getByText } = doRender({ getTeamsMock }, cookies)

    await wait(() => {
      expect(container).not.toHaveTextContent(
        /team you've selected doesn't exist/
      )
    })
    fireEvent.click(getByText('First team'))

    expect(container).toHaveTextContent('Selected team id is id-333')
    expect(cookies.get('team')).toEqual('id-333')
  })
})

it('tells you to create some teams when none exist yet', async () => {
  const getTeamsMock = mockGetTeams.returns({ teams: [] })
  const { container, getByText } = doRender({ getTeamsMock }, cookies)

  await waitForElement(() =>
    getByText(
      "You'll need to create a team before you can enter an EOD update."
    )
  )
  expect(container).toHaveTextContent('Create a team →')
})
