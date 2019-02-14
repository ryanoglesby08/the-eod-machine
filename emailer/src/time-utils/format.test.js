import { toShortDate, toLongDate } from './format'

describe('toShortDate', () => {
  it('includes a shortened month and 2 digit day', () => {
    expect(toShortDate(new Date(2019, 1, 10))).toEqual('Feb 10')
    expect(toShortDate(new Date(2019, 1, 1))).toEqual('Feb 01')
  })
})

describe('toLongDate', () => {
  it('includes a shortened month, 2 digit day, and full year', () => {
    expect(toLongDate(new Date(2019, 1, 10))).toEqual('Feb 10, 2019')
    expect(toLongDate(new Date(2019, 1, 1))).toEqual('Feb 01, 2019')
  })
})
