import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format date when there is a value', () => {
    expect(formatDate('2021-01-01')).toBe('01/01/2021')
  })
})
