import { keepPreviousData } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { $api } from 'api'

const useInvoices = (pagination?: PaginationState) => {
  const [searchParams] = useSearchParams()

  const customerId = searchParams.get('customer_id')

  const getFilter = useCallback(() => {
    const filters = []
    if (customerId) {
      filters.push({
        field: 'customer_id',
        operator: 'eq',
        value: customerId,
      })
    }

    if (!filters.length) {
      return undefined
    }
    return JSON.stringify(filters)
  }, [customerId])

  return $api.useQuery(
    'get',
    '/invoices',
    {
      params: {
        query: {
          per_page: pagination?.pageSize ?? 10,
          page: pagination?.pageIndex ? +pagination.pageIndex + 1 : 1,
          filter: getFilter(),
        },
      },
    },
    { placeholderData: keepPreviousData }
  )
}

export default useInvoices
