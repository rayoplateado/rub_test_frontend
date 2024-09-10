import { forwardRef, useCallback } from 'react'
import { Form } from 'react-bootstrap'
import { AsyncPaginate } from 'react-select-async-paginate'
import { Customer } from 'types'

import { client } from 'api'

import {
  SelectForwardType,
  SelectLoadOptions,
  SelectProps,
} from './SelectAutocomplete'

const defaultAdditional = { page: 1 }

const getCustomerLabel = (customer: Customer) => {
  return `${customer.first_name} ${customer.last_name}`
}

const getCustomerOption = (customer: Customer) => {
  return `${customer.id}`
}

const CustomerAutocomplete = forwardRef<
  SelectForwardType<Customer>,
  SelectProps<Customer>
>(({ error, ...rest }, ref) => {
  const loadOptions: SelectLoadOptions<Customer> = useCallback(
    async (search, _, additional) => {
      const page = additional?.page ?? 1
      const { data } = await client.GET('/customers/search', {
        params: {
          query: {
            query: search,
            per_page: 10,
            page,
          },
        },
      })

      return {
        options: data?.customers ?? [],
        hasMore:
          (data?.pagination?.page ?? 0) < (data?.pagination?.total_pages ?? 0),
        additional: {
          page: page + 1,
        },
      }
    },
    []
  )

  return (
    <>
      <AsyncPaginate
        {...rest}
        selectRef={ref}
        placeholder="Search a customer"
        getOptionLabel={getCustomerLabel}
        getOptionValue={getCustomerOption}
        additional={defaultAdditional}
        loadOptions={loadOptions}
      />
      {!!error && <Form.Text className="text-danger">{error}</Form.Text>}
    </>
  )
})

export default CustomerAutocomplete
