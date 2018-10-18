const { anEntry } = require('./entry-mother')

const defaultTeam = {
  _id: 'team-0',
  name: 'The team',
  mailingList: ['team@example.com'],
  currentEod: [anEntry()],
}

const aTeamWithItsEod = (overrides = {}) => {
  return Object.assign({}, defaultTeam, overrides)
}

module.exports = { aTeamWithItsEod }
