import numeral from 'numeral'

numeral.register('locale', 'fr', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: '€',
  },
})

numeral.locale('fr')

export const formatCurrency = (value?: number | string | null) => {
  if (typeof value === 'undefined' || value === null) {
    return value
  }

  return numeral(Number(value)).format('0,0.[00]$')
}
