import buildDefaultTeam from '../../__test-utils__/team-builder'

export const aTeam = (overrides = {}) => {
  const { _id, name, mailingList } = buildDefaultTeam()

  return {
    _id,
    name,
    mailingList,
    ...overrides,
  }
}
