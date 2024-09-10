import { forwardRef, useCallback } from 'react'
import { Form } from 'react-bootstrap'
import { AsyncPaginate } from 'react-select-async-paginate'
import { Product } from 'types'

import { client } from 'api'

import {
  SelectForwardType,
  SelectLoadOptions,
  SelectProps,
} from './SelectAutocomplete'

const defaultAdditional = { page: 1 }

const getProductLabel = (product: Product) => {
  return product.label
}

const getProductOption = (product: Product) => {
  return `${product.id}`
}

const ProductAutocomplete = forwardRef<
  SelectForwardType<Product>,
  SelectProps<Product>
>(({ error, ...rest }, ref) => {
  const loadOptions: SelectLoadOptions<Product> = useCallback(
    async (search, _, additional) => {
      const page = additional?.page ?? 1
      const { data } = await client.GET('/products/search', {
        params: {
          query: {
            query: search,
            per_page: 10,
            page,
          },
        },
      })

      return {
        options: data?.products ?? [],
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
        placeholder="Search a product"
        additional={defaultAdditional}
        loadOptions={loadOptions}
        getOptionLabel={getProductLabel}
        getOptionValue={getProductOption}
      />
      {!!error && <Form.Text className="text-danger">{error}</Form.Text>}
    </>
  )
})

export default ProductAutocomplete
