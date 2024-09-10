import { useCallback, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Invoice } from 'types'

import { $api } from 'api'

const InvoiceActions = ({
  invoice,
  onSuccess,
  onDeleteSuccess,
}: {
  invoice: Invoice
  onSuccess: () => Promise<void>
  onDeleteSuccess: () => Promise<void>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const { mutateAsync } = $api.useMutation('put', '/invoices/{id}')
  const { mutateAsync: deleteMutateAsync } = $api.useMutation(
    'delete',
    '/invoices/{id}'
  )
  const onFinalize = useCallback(async () => {
    setIsLoading(true)
    try {
      await mutateAsync({
        params: {
          path: {
            id: invoice.id,
          },
        },
        body: {
          invoice: {
            finalized: true,
          },
        },
      })
      await onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [mutateAsync, onSuccess, invoice.id])

  const onMarkAsPaid = useCallback(async () => {
    setIsLoading(true)
    try {
      await mutateAsync({
        params: {
          path: {
            id: invoice.id,
          },
        },
        body: {
          invoice: {
            paid: true,
          },
        },
      })
      await onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [mutateAsync, onSuccess, invoice.id])

  const onDelete = useCallback(async () => {
    setIsLoading(true)
    try {
      await deleteMutateAsync({
        params: {
          path: {
            id: invoice.id,
          },
        },
      })
      await onDeleteSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [deleteMutateAsync, onDeleteSuccess, invoice.id])

  return (
    <>
      <Row className="mt-5">
        <Col xs={10}>
          {!invoice?.finalized && (
            <Button disabled={isLoading} onClick={onFinalize}>
              Mark as finalized
            </Button>
          )}
          {invoice?.finalized && !invoice?.paid && (
            <Button disabled={isLoading} onClick={onMarkAsPaid}>
              Mark as paid
            </Button>
          )}
        </Col>
        {!invoice.finalized && (
          <Col xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={isLoading}
              onClick={() => setShowConfirmationModal(true)}
              variant="outline-danger"
            >
              Delete invoice
            </Button>
          </Col>
        )}
      </Row>
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this invoice?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" disabled={isLoading} onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InvoiceActions
