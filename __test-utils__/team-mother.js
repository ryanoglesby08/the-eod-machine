const pick = require('./pick')
const { anAuthoredEntry } = require('./entry-mother')
const { createLocationMother } = require('./location-mother')

const aLocation = createLocationMother(['name', 'timeZone'])

const baseTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  locations: [
    aLocation({ name: 'First city' }),
    aLocation({ name: 'Second city' }),
  ],
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
