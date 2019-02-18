import {
  to24HourTime,
  convertLocalTimeToUtcTime,
  roundToNearestHalfHour,
} from './convert'

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
    expect(utcTime).toEqual('01:00')
  })
})

describe('roundToNearestHalfHour', () => {
  it('rounds to the nearest half hour', () => {
    expect(roundToNearestHalfHour('10:00')).toEqual('10:00')
    expect(roundToNearestHalfHour('10:02')).toEqual('10:00')

    expect(roundToNearestHalfHour('10:15')).toEqual('10:30')
    expect(roundToNearestHalfHour('10:30')).toEqual('10:30')

    expect(roundToNearestHalfHour('10:59')).toEqual('11:00')

    expect(roundToNearestHalfHour('01:59')).toEqual('02:00')

    expect(roundToNearestHalfHour('23:59')).toEqual('00:00')
  })
})
