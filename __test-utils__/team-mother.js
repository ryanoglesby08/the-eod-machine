const pick = require('./pick')
const { anAuthoredEntry } = require('./entry-mother')

const defaultTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  currentEod: [anAuthoredEntry()],
}

const aTeam = (overrides = {}) => {
  return Object.assign(
    {},
    pick(defaultTeam, ['_id', 'name', 'mailingList']),
    pick(overrides, ['_id', 'name', 'mailingList'])
  )
}

const aTeamWithItsEod = (overrides = {}) => {
  return Object.assign({}, defaultTeam, overrides)
}

const someTeamInput = (overrides = {}) => {
  return Object.assign(
    {},
    pick(defaultTeam, ['name', 'mailingList']),
    pick(overrides, ['name', 'mailingList'])
  )
}

module.exports = { aTeam, aTeamWithItsEod, someTeamInput }
