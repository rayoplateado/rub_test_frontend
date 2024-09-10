import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import InvoiceFilters from './InvoiceFilters'
import InvoiceTable from './InvoiceTable'

const InvoicesList = (): React.ReactElement => {
  return (
    <>
      <Container>
        <InvoiceFilters />
        <InvoiceTable />
      </Container>
      <Outlet />
    </>
  )
}

export default InvoicesList
