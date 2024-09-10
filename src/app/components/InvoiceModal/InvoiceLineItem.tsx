import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Stack } from 'react-bootstrap'
import {
  Controller,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form'

import ProductAutocomplete from 'app/components/ProductAutocomplete'
import { formatCurrency } from 'app/utils/formatCurrency'

import { InvoiceFormProps } from './InvoiceModal.types'

export const InvoiceLineItem = ({
  index,
  remove,
}: {
  index: number
  remove: UseFieldArrayRemove
}) => {
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext<InvoiceFormProps>()

  const quantity = watch(`invoiceLines.${index}.quantity`)
  const product = watch(`invoiceLines.${index}.product`)

  const numberOfLines = watch('invoiceLines').length

  const price = product
    ? Number(product.unit_price) * Number(quantity)
    : undefined

  return (
    <Stack
      direction="horizontal"
      className="mb-3"
      gap={3}
      style={{ alignItems: 'flex-start' }}
    >
      <Form.Group
        controlId={`invoiceLines.${index}.quantity`}
        style={{ width: 80 }}
      >
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          {...register(`invoiceLines.${index}.quantity`)}
        />
      </Form.Group>
      <div style={{ flex: 1 }}>
        <Form.Group controlId={`invoiceLines.${index}.product`}>
          <Form.Label>Product</Form.Label>
          <Controller
            name={`invoiceLines.${index}.product`}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <ProductAutocomplete
                ref={ref}
                value={value}
                onChange={onChange}
                error={errors?.invoiceLines?.[index]?.product?.message}
              />
            )}
            rules={{ required: 'Select a product' }}
          />
        </Form.Group>
      </div>
      <div style={{ width: 120 }}>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={formatCurrency(price) ?? ''}
            disabled
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group>
          <Form.Label>&nbsp;</Form.Label>
          <div>
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="outline-danger"
              disabled={numberOfLines === 1}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Form.Group>
      </div>
    </Stack>
  )
}
