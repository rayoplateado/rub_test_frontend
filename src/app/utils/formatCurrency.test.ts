import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('should format currency when there is no value', () => {
    expect(formatCurrency(undefined)).toBeUndefined()
    expect(formatCurrency(null)).toBeNull()
  })

  it('should format currency when there is a value (zeroed)', () => {
    expect(formatCurrency(0)).toBe('0€')
  })

  it('should format currency when there is a value (integer)', () => {
    expect(formatCurrency(1000)).toBe('1.000€')
  })

  it('should format currency when there is a value (decimal)', () => {
    expect(formatCurrency(1000.12)).toBe('1.000,12€')
  })
})
