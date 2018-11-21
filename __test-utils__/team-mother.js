const pick = require('./pick')
const { anAuthoredEntry } = require('./entry-mother')

const defaultTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  currentEod: [anAuthoredEntry()],
}

const createTeamBuilder = relevantFields => (overrides = {}) => {
  return Object.assign(
    {},
    pick(defaultTeam, relevantFields),
    pick(overrides, relevantFields)
  )
}

const aTeam = createTeamBuilder(['_id', 'name', 'mailingList'])
const someTeamInput = createTeamBuilder(['name', 'mailingList'])

const aTeamWithItsEod = (overrides = {}) => {
  return Object.assign({}, defaultTeam, overrides)
}

module.exports = { aTeam, aTeamWithItsEod, someTeamInput, createTeamBuilder }
