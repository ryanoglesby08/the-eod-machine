import { to24HourTime, convertLocalTimeToUtcTime } from './time-utils'

describe('to24HourTime', () => {
  it('converts an am pm time string into a 24 hour time object', () => {
    expect(to24HourTime('12:00 AM')).toEqual({ hours: 0, minutes: 0 })
    expect(to24HourTime('3:30 AM')).toEqual({ hours: 3, minutes: 30 })
    expect(to24HourTime('12:00 PM')).toEqual({ hours: 12, minutes: 0 })
    expect(to24HourTime('4:30 PM')).toEqual({ hours: 16, minutes: 30 })
  })
})

describe('convertLocalTimeToUtcTime', () => {
  it('converts a time to UTC time', () => {
    const utcTime = convertLocalTimeToUtcTime('5:00 PM', 'America/Los_Angeles')
    expect(utcTime).toEqual('00:00')
  })
})
