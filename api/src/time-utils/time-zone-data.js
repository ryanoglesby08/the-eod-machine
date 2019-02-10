import timeZonesData from 'timezones.json'

const timeZoneDataByValue = timeZonesData.reduce(
  (accumulator, currentTimeZoneObject) => {
    return {
      ...accumulator,
      [currentTimeZoneObject.value]: currentTimeZoneObject,
    }
  },
  {}
)

export default timeZoneDataByValue
