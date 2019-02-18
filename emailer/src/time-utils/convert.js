import { zonedTimeToUtc } from 'date-fns-tz'

export const to24HourTime = ampmTime => {
  const [time, ampm] = ampmTime.split(' ')
  let [hours, minutes] = time.split(':').map(t => parseInt(t))

  if (hours === 12 && ampm === 'AM') {
    hours = 0
  }

  if (hours !== 12 && ampm === 'PM') {
    hours += 12
  }

  return { hours, minutes }
}

export const convertLocalTimeToUtcTime = (localTime, localTimeZone) => {
  const { hours, minutes } = to24HourTime(localTime)

  const localDate = new Date()
  localDate.setHours(hours, minutes, 0, 0)

  const utcDate = zonedTimeToUtc(localDate, localTimeZone)
  const utcTime = utcDate.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })

  return utcTime
}

export const roundToNearestHalfHour = utcTimeString => {
  const [hours, minutes] = utcTimeString.split(':').map(t => parseInt(t))

  const roundedMinutes = Math.round(minutes / 30) * 30

  const time = new Date()
  time.setHours(hours, roundedMinutes, 0, 0)

  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
}
