import { Button } from 'react-bootstrap'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { InvoiceLineItem } from './InvoiceLineItem'
import { InvoiceFormProps } from './InvoiceModal.types'

export const InvoiceLinesForm = () => {
  const { control } = useFormContext<InvoiceFormProps>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invoiceLines',
  })

  return (
    <>
      {fields.map((field, index) => (
        <InvoiceLineItem key={field.id} index={index} remove={remove} />
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            quantity: '1',
          })
        }
        variant="outline-primary"
        size="sm"
      >
        New item
      </Button>
    </>
  )
}
