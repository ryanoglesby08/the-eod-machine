import timeZonesData from 'timezones.json'

const timeZonesDataByValue = timeZonesData.reduce(
  (accumulator, currentTimeZoneObject) => {
    return {
      ...accumulator,
      [currentTimeZoneObject.value]: currentTimeZoneObject,
    }
  },
  {}
)

export const getUtcTimezone = timeZone => timeZonesDataByValue[timeZone].utc[0]

export default timeZonesDataByValue
