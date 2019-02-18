import { toShortDate, toLongDate } from './format'

describe('toShortDate', () => {
  it('includes a shortened month and 2 digit day in the specified time zone', () => {
    const date = new Date(2019, 1, 18, 10) // Feb 18, 2019 @ 10am

    const shortDate = toShortDate(date, 'Asia/Kolkata')

    expect(shortDate).toEqual('Feb 19')
  })
})

describe('toLongDate', () => {
  it('includes a shortened month, 2 digit day, and full year in the specified time zone', () => {
    const date = new Date(2019, 1, 18, 10) // Feb 18, 2019 @ 10am

    const longDate = toLongDate(date, 'Asia/Kolkata')

    expect(longDate).toEqual('Feb 19, 2019')
  })
})
