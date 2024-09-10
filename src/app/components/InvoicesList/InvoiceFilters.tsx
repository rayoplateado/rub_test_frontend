import { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import CustomerAutocomplete from 'app/components/CustomerAutocomplete'
import { paths } from 'app/paths'

import { Customer, Product } from 'types'

const InvoiceFilters = () => {
  const [customer, setCustomer] = useState<Customer | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const currentCustomerId = searchParams.get('customer_id')

  const handleQueryChange = (
    value: Customer | Product | null,
    paramName: string
  ) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(paramName, value.id.toString())
    } else {
      params.delete(paramName)
    }

    setSearchParams(params)
  }

  const handleCustomerChange = (customer: Customer | null) => {
    setCustomer(customer)
    handleQueryChange(customer, 'customer_id')
  }

  useEffect(() => {
    if (!currentCustomerId) {
      setCustomer(null)
    }
  }, [currentCustomerId])

  return (
    <Stack direction="horizontal" gap={3} className="mt-5 mb-3 w-100">
      <div style={{ width: '320px' }}>
        <CustomerAutocomplete
          value={customer}
          onChange={handleCustomerChange}
          isClearable
        />
      </div>

      <div className="ms-auto">
        <Link to={`${paths.invoices.new()}?${searchParams.toString()}`}>
          <Button>New invoice</Button>
        </Link>
      </div>
    </Stack>
  )
}

export default InvoiceFilters
