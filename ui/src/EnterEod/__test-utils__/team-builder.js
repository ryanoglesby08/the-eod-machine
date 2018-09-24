const defaults = () => ({
  _id: Math.floor(Math.random() * 1000).toString(),
  name: 'A team name',
})

export const aTeam = (overrides = {}) => ({
  ...defaults(),
  ...overrides,
})
