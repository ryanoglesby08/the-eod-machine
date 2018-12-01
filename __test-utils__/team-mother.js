const pick = require('./pick')
const { anAuthoredEntry } = require('./entry-mother')

const baseTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  locations: [],
  currentEod: [anAuthoredEntry()],
}

const createTeamMother = relevantFields => (overrides = {}) => {
  return Object.assign(
    {},
    pick(baseTeam, relevantFields),
    pick(overrides, relevantFields)
  )
}

module.exports = { baseTeam, createTeamMother }
