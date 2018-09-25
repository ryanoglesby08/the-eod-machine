import buildDefaultTeam from '../../__test-utils__/team-builder'

export const aTeam = (overrides = {}) => {
  const { _id, name } = buildDefaultTeam()

  return {
    _id,
    name,
    ...overrides,
  }
}
