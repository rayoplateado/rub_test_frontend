import { $api } from 'api'

import { renderHook } from 'app/test-utils'

import useInvoices from '.'

jest.mock('api')

describe('useInvoices', () => {
  test('should render', () => {
    const useQuery = jest.spyOn($api, 'useQuery')

    renderHook(() => useInvoices())

    expect(useQuery).toHaveBeenCalledWith(
      'get',
      '/invoices',
      {
        params: {
          query: {
            per_page: 10,
            page: 1,
          },
        },
      },
      expect.objectContaining({ placeholderData: expect.any(Function) })
    )
  })
})
