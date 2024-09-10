import { useCallback } from 'react'
import { Alert, Badge, Col, Container, Placeholder, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router'
import { Outlet, useNavigate } from 'react-router-dom'

import { $api } from 'api'

import { formatCurrency } from 'app/utils/formatCurrency'
import { formatDate } from 'app/utils/formatDate'

import { Customer } from 'types'

import EditButton from './EditButton'
import InvoiceActions from './InvoiceActions'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data,
    refetch,
    isLoading: isLoadingData,
    isError,
  } = $api.useQuery('get', '/invoices/{id}', {
    params: {
      path: {
        id: Number(id),
      },
    },
  })

  // See know issues (2)
  const customer = (data as any)?.customer as Customer

  const onSuccess = useCallback(async () => {
    await refetch()
  }, [refetch])

  const onDelete = useCallback(async () => {
    navigate('/')
  }, [navigate])

  if (isError) {
    return (
      <Container>
        <Alert variant="warning">There was an error loading the data</Alert>
      </Container>
    )
  }

  if (isLoadingData) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={12} />
            </Placeholder>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Invoice #${data?.id} - ${customer?.first_name} ${customer?.last_name}`}</title>
      </Helmet>
      <Container className="mt-5">
        <Row>
          <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <EditButton finalized={data?.finalized} id={id} />
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <div>
              <strong>
                {customer?.first_name} {customer?.last_name}
              </strong>
            </div>
            <div>{customer?.address}</div>
            <div>
              {customer?.zip_code} {customer?.city}
            </div>
            <div>{customer?.country}</div>
          </Col>
          <Col xs={6}>
            <div>
              <strong>Invoice</strong>{' '}
              {data?.finalized && <Badge bg="primary">Finalized</Badge>}
            </div>
            <div>#{data?.id}</div>
            <div>Date: {formatDate(data?.date)}</div>
            <div>
              Deadline:{' '}
              {data?.deadline ? formatDate(data?.deadline) : 'Not set'}
            </div>
            <div>
              Status:{' '}
              {data?.paid ? (
                <Badge bg="success">Paid</Badge>
              ) : (
                <Badge bg="danger">Unpaid</Badge>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ width: '100px' }}>Quantity</th>
                  <th style={{ width: '130px' }}>Price</th>
                  <th style={{ width: '130px' }}>Tax</th>
                </tr>
              </thead>
              <tbody>
                {data?.invoice_lines?.map((line) => (
                  <tr key={line.id}>
                    <td>{line.label}</td>
                    <td>{line.quantity}</td>
                    <td>{formatCurrency(line.price)}</td>
                    <td>{formatCurrency(line.tax)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={1} />
                  <th>Total</th>
                  <td>{formatCurrency(data?.total)}</td>
                  <td>{formatCurrency(data?.tax)}</td>
                </tr>
              </tfoot>
            </table>
          </Col>
        </Row>
        {!!data && (
          <InvoiceActions
            invoice={data}
            onSuccess={onSuccess}
            onDeleteSuccess={onDelete}
          />
        )}
      </Container>
      <Outlet />
    </>
  )
}

export default InvoiceShow
