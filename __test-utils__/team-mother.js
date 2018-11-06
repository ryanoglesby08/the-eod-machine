const pick = require('./pick')
const { anAuthoredEntry } = require('./entry-mother')

const defaultTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  currentEod: [anAuthoredEntry()],
}

const aTeamWithItsEod = (overrides = {}) => {
  return Object.assign({}, defaultTeam, overrides)
}

const someTeamInput = (overrides = {}) => {
  return Object.assign(
    {},
    pick(defaultTeam, ['name', 'mailingList']),
    overrides
  )
}

module.exports = { aTeamWithItsEod, someTeamInput }
