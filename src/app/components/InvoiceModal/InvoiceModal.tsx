import { Button, Form, Modal, Stack } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import CustomerAutocomplete from 'app/components/CustomerAutocomplete'
import { formatCurrency } from 'app/utils/formatCurrency'

import { InvoiceLinesForm } from './InvoiceLineForm'
import { InvoiceFormProps } from './InvoiceModal.types'
import './datepicker-modifier.css'

export interface InvoiceModalProps {
  onSubmit: (data: InvoiceFormProps) => void
  onClose: (id?: number) => void
  title: string
  saveAction: string
  defaultValues?: InvoiceFormProps
  disabledFields?: ('customer' | 'date' | 'deadline')[]
}

const InvoiceModal = ({
  onSubmit,
  onClose,
  title,
  saveAction,
  defaultValues,
  disabledFields,
}: InvoiceModalProps) => {
  const formMethods = useForm<InvoiceFormProps>({
    defaultValues,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods

  const date = formMethods.watch('date')
  const deadline = formMethods.watch('deadline')

  const total = formMethods
    .watch('invoiceLines')
    ?.reduce(
      (acc, line) =>
        acc + (Number(line.product?.unit_price) ?? 0) * Number(line.quantity),
      0
    )

  return (
    <Modal show onHide={onClose} animation={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Stack
              direction="horizontal"
              gap={3}
              style={{ alignItems: 'flex-start' }}
            >
              <Form.Group controlId="customer" style={{ width: '50%' }}>
                <Form.Label>Customer</Form.Label>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <CustomerAutocomplete
                      ref={ref}
                      value={value}
                      onChange={onChange}
                      error={errors.customer?.message}
                      isDisabled={disabledFields?.includes('customer')}
                      inputId="customer"
                    />
                  )}
                  rules={{ required: 'Select a customer' }}
                />
              </Form.Group>
              <Form.Group controlId="date" style={{ width: '50%' }}>
                <Form.Label>Date</Form.Label>
                <div>
                  <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date ? new Date(date) : null}
                    onChange={(date) =>
                      formMethods.setValue('date', date?.toString() ?? '')
                    }
                    customInput={<Form.Control style={{ width: '100%' }} />}
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="date" style={{ width: '50%' }}>
                <Form.Label>Deadline</Form.Label>
                <div>
                  <ReactDatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={deadline ? new Date(deadline) : null}
                    onChange={(deadline) =>
                      formMethods.setValue(
                        'deadline',
                        deadline?.toString() ?? ''
                      )
                    }
                    customInput={<Form.Control style={{ width: '100%' }} />}
                    isClearable
                  />
                </div>
              </Form.Group>
            </Stack>

            <div className="mt-4 mb-2">
              <strong>Invoice items</strong>
            </div>

            <InvoiceLinesForm />
          </Modal.Body>
          <Modal.Footer>
            <div style={{ width: 150 }}>Total: {formatCurrency(total)}</div>
            <Button
              variant="primary"
              type="submit"
              disabled={formMethods.formState.isSubmitting}
            >
              {saveAction}
            </Button>
          </Modal.Footer>
        </Form>
      </FormProvider>
    </Modal>
  )
}

export { InvoiceModal }
