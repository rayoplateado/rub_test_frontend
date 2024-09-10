import { Invoice } from 'types'

import { components } from 'api/schema'

import {
  InvoiceFormProps,
  InvoiceLine,
} from 'app/components/InvoiceModal/InvoiceModal.types'

export const parseInvoiceLineToForm = (
  invoiceLine: components['schemas']['InvoiceLine']
): InvoiceLine => {
  return {
    id: invoiceLine.id,
    quantity: invoiceLine.quantity.toString(),
    product: invoiceLine.product,
    _destroy: false,
  }
}

export const parseApiToForm = (invoice: Invoice): InvoiceFormProps => {
  return {
    date: invoice.date,
    deadline: invoice.deadline,
    customer: invoice.customer,
    invoiceLines: invoice.invoice_lines.map(parseInvoiceLineToForm),
  }
}

export const parseInvoiceLineToApi = (
  invoiceLine: InvoiceLine
): components['schemas']['InvoiceLineUpdatePayload'] | null => {
  if (!invoiceLine?.product) {
    return null
  }

  return {
    id: invoiceLine.id,
    product_id: invoiceLine.product.id,
    quantity: Number(invoiceLine.quantity),
    label: invoiceLine.product.label,
    unit: invoiceLine.product.unit,
    vat_rate: invoiceLine.product.vat_rate,
    price:
      Number(invoiceLine.product.unit_price) * Number(invoiceLine.quantity),
    tax: Number(invoiceLine.product.vat_rate) * Number(invoiceLine.quantity),
    _destroy: invoiceLine._destroy,
  }
}

export const parseFormToApi = (
  invoice: InvoiceFormProps,
  defaultValues?: InvoiceFormProps
): components['schemas']['InvoiceUpdatePayload'] => {
  const invoiceLines = invoice.invoiceLines.map(
    parseInvoiceLineToApi
  ) as components['schemas']['InvoiceLineUpdatePayload'][]

  const deletedInvoiceLines = defaultValues?.invoiceLines
    .filter(
      (defaultLine) =>
        !invoice.invoiceLines.some((line) => line.id === defaultLine.id)
    )
    .map((line) => ({
      id: line.id,
      _destroy: true,
    }))

  if (deletedInvoiceLines && deletedInvoiceLines.length > 0) {
    invoiceLines.push(...deletedInvoiceLines)
  }

  return {
    date: invoice.date,
    deadline: invoice.deadline,
    invoice_lines_attributes: invoiceLines,
  }
}
