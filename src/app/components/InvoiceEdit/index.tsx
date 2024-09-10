import { useNavigate, useParams } from 'react-router-dom'

import { $api } from 'api'

import { InvoiceModal } from 'app/components/InvoiceModal'
import { InvoiceFormProps } from 'app/components/InvoiceModal/InvoiceModal.types'

import { parseApiToForm, parseFormToApi } from './InvoiceEdit.utils'

const disabledFields = ['customer' as const]

const InvoiceEdit = () => {
  const navigate = useNavigate()

  const params = useParams()

  const invoiceId = params.id

  const { mutateAsync: updateInvoice } = $api.useMutation(
    'put',
    '/invoices/{id}'
  )

  const { data: invoice, refetch } = $api.useQuery('get', '/invoices/{id}', {
    params: {
      path: {
        id: Number(invoiceId),
      },
    },
  })
  const defaultValues = invoice ? parseApiToForm(invoice) : undefined

  const onClose = () => {
    navigate(-1)
  }

  const onSubmit = async (data: InvoiceFormProps) => {
    await updateInvoice({
      params: {
        path: {
          id: Number(invoiceId),
        },
      },
      body: {
        invoice: parseFormToApi(data, defaultValues),
      },
    })
    await refetch()
    onClose()
  }

  if (!defaultValues) {
    return <div />
  }

  return (
    <InvoiceModal
      title="Edit invoice"
      saveAction="Save changes"
      onSubmit={onSubmit}
      onClose={onClose}
      defaultValues={defaultValues}
      disabledFields={disabledFields}
    />
  )
}

export default InvoiceEdit
