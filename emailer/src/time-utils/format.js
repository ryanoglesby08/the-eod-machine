import { utcToZonedTime, toDate } from 'date-fns-tz'

const convertToLocalDate = (date, localTimeZone) => {
  const utcDate = toDate(date.toISOString(), { timeZone: 'Etc/GMT' })

  return utcToZonedTime(utcDate, localTimeZone)
}

export const toShortDate = (date, timeZone) => {
  const localDate = convertToLocalDate(date, timeZone)

  return localDate.toLocaleString('en-US', {
    timeZone,
    month: 'short',
    day: '2-digit',
  })
}

export const toLongDate = (date, timeZone) => {
  const localDate = convertToLocalDate(date, timeZone)

  return localDate.toLocaleString('en-US', {
    timeZone,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
