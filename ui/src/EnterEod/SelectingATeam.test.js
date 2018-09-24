import React from 'react'
import { CookiesProvider, Cookies } from 'react-cookie'
import { MockedProvider } from 'react-apollo/lib/test-utils'
import { MemoryRouter } from 'react-router-dom'

import { render, wait, fireEvent, waitForElement } from 'react-testing-library'

import { buildMockGetTeams } from './__mocks__/teamGraphQlMocks'
import { aTeam } from './__test-utils__/team-builder'

import WithTeam from './WithTeam'

const doRender = ({ getTeamsMock }, cookies) => {
  const mocks = [getTeamsMock]

  return render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CookiesProvider cookies={cookies}>
          <WithTeam>
            {teamId => <div>Selected team id is {teamId}</div>}
          </WithTeam>
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
    const getTeamsMock = buildMockGetTeams([
      aTeam({ _id: 'id-111', name: 'First team' }),
    ])

    const { container } = doRender({ getTeamsMock }, cookies)

    await wait(() => {
      expect(container).toHaveTextContent('Selected team id is id-111')
    })
  })

  it('requires you to choose a new team when yours does not exist', async () => {
    cookies.set('team', '211')
    const getTeamsMock = buildMockGetTeams([
      aTeam({ _id: 'id-222', name: 'First team' }),
    ])

    const { container, getByText } = doRender({ getTeamsMock }, cookies)

    await wait(() => expect(container).toHaveTextContent('Team does not exist'))
    fireEvent.click(getByText('First team'))

    expect(container).toHaveTextContent('Selected team id is id-222')
    expect(cookies.get('team')).toEqual('id-222')
  })
})

describe("when a team hasn't already been selected", () => {
  it('shows the team selector', async () => {
    const getTeamsMock = buildMockGetTeams([
      aTeam({ name: 'First team' }),
      aTeam({ name: 'Second team' }),
    ])
    const { container } = doRender({ getTeamsMock }, cookies)

    await wait(() => {
      expect(container).toHaveTextContent('Select your team')
      expect(container).toHaveTextContent('First team')
      expect(container).toHaveTextContent('Second team')
    })
  })

  it('requires you to choose a team', async () => {
    const getTeamsMock = buildMockGetTeams([
      aTeam({ _id: 'id-333', name: 'First team' }),
    ])
    const { container, getByText } = doRender({ getTeamsMock }, cookies)

    const firstTeam = await waitForElement(() => getByText('First team'))
    fireEvent.click(firstTeam)

    expect(container).toHaveTextContent('Selected team id is id-333')
    expect(cookies.get('team')).toEqual('id-333')
  })
})

it('tells you to create some teams when none exist yet', async () => {
  const getTeamsMock = buildMockGetTeams([])
  const { container, getByText } = doRender({ getTeamsMock }, cookies)

  await waitForElement(() => getByText('There are no teams'))
  expect(container).toHaveTextContent('Create teams')
})

// TODO handle when there are not any teams created yet
