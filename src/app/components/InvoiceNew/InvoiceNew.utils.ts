import { Customer } from 'types'

import { components } from 'api/schema'

import {
  InvoiceFormProps,
  InvoiceLine,
} from 'app/components/InvoiceModal/InvoiceModal.types'

const parseInvoiceLine = (
  invoiceLine: InvoiceLine
): components['schemas']['InvoiceLineCreatePayload'] | null => {
  if (!invoiceLine?.product) {
    return null
  }

  return {
    product_id: invoiceLine.product.id,
    quantity: Number(invoiceLine.quantity),
    label: invoiceLine.product.label,
    unit: invoiceLine.product.unit,
    vat_rate: invoiceLine.product.vat_rate,
    price:
      Number(invoiceLine.product.unit_price) * Number(invoiceLine.quantity),
    tax: Number(invoiceLine.product.vat_rate) * Number(invoiceLine.quantity),
  }
}

const parseFormToApi = (
  data: InvoiceFormProps
): components['schemas']['InvoiceCreatePayload'] => {
  const invoiceLines = data.invoiceLines.map((invoiceLine) =>
    parseInvoiceLine(invoiceLine)
  )

  return {
    customer_id: (data.customer as Customer).id,
    finalized: false,
    paid: false,
    date: data.date,
    deadline: data.deadline,
    invoice_lines_attributes: invoiceLines.filter(
      (invoiceLine) => invoiceLine !== null
    ) as components['schemas']['InvoiceLineCreatePayload'][],
  }
}

export const defaultValues: InvoiceFormProps = {
  date: new Date().toISOString(),
  deadline: null,
  customer: null,
  invoiceLines: [
    {
      quantity: '1',
    },
  ],
}

export { parseInvoiceLine, parseFormToApi }
