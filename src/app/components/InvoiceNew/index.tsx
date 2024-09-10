import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

import { $api } from 'api'

import { InvoiceModal } from 'app/components/InvoiceModal'
import { InvoiceFormProps } from 'app/components/InvoiceModal/InvoiceModal.types'
import useInvoices from 'app/hooks/useInvoices'
import { paths } from 'app/paths'

import { defaultValues, parseFormToApi } from './InvoiceNew.utils'

const InvoiceNew = (): React.ReactElement => {
  const navigate = useNavigate()

  const { mutateAsync } = $api.useMutation('post', '/invoices')

  const { refetch } = useInvoices()

  const handleClose = (id?: number) => {
    if (!id) {
      navigate(paths.invoices.base(), { replace: true })
      return
    }
    navigate(paths.invoices.show(id), { replace: true })
  }

  const onSubmit = async (data: InvoiceFormProps) => {
    const { id } = await mutateAsync({
      body: {
        invoice: parseFormToApi(data),
      },
    })
    await refetch()

    handleClose(id)
  }

  return (
    <>
      <Helmet>
        <title>New invoice</title>
      </Helmet>
      <InvoiceModal
        onSubmit={onSubmit}
        onClose={handleClose}
        title="New invoice"
        saveAction="Create invoice"
        defaultValues={defaultValues}
      />
    </>
  )
}

export default InvoiceNew
