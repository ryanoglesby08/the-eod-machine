import { zonedTimeToUtc } from 'date-fns-tz'

export const to24HourTime = ampmTime => {
  const [time, ampm] = ampmTime.split(' ')
  let [hours, minutes] = time.split(':')

  hours = parseInt(hours)
  minutes = parseInt(minutes)

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
