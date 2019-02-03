const pick = require('./pick')

const baseLocation = {
  name: 'The location',
  timeZone: 'America/Chicago',
  eodTime: '5:00 PM',
}

const createLocationMother = relevantFields => (overrides = {}) => {
  return Object.assign(
    {},
    pick(baseLocation, relevantFields),
    pick(overrides, relevantFields)
  )
}

const aLocation = (overrides = {}) => {
  return Object.assign({}, baseLocation, overrides)
}

module.exports = { baseLocation, aLocation, createLocationMother }
