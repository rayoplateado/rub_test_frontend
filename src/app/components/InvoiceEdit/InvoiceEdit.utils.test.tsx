import {
  parseApiToForm,
  parseFormToApi,
  parseInvoiceLineToApi,
  parseInvoiceLineToForm,
} from './InvoiceEdit.utils'

const apiInvoiceLine = {
  id: 1,
  quantity: 1,
  product: {
    id: 1,
    label: 'Product 1',
    unit: 'unit',
    vat_rate: 20,
    unit_price: 100,
  },
}

const apiCustomer = {
  id: 1,
  name: 'Customer 1',
  address: 'Address 1',
  zip_code: '12345',
  city: 'City 1',
  country: 'Country 1',
}

const apiInvoice = {
  id: 1,
  date: '2021-01-01',
  deadline: '2021-01-01',
  customer: apiCustomer,
  invoice_lines: [apiInvoiceLine],
}

const invoiceLineExpected = {
  id: 1,
  quantity: '1',
  product: {
    id: 1,
    label: 'Product 1',
    unit: 'unit',
    vat_rate: 20,
    unit_price: 100,
  },
  _destroy: false,
}

const formInvoiceLineProduct = {
  id: 1,
  label: 'Product 1',
  unit: 'hour' as const,
  vat_rate: '5.5',
  unit_price: '100',
} as any

const formInvoiceLine = {
  id: 1,
  quantity: '2',
  product: formInvoiceLineProduct,
  _destroy: false,
}

const expectedApiInvoiceLine = {
  id: 1,
  product_id: 1,
  quantity: 2,
  label: 'Product 1',
  unit: 'hour' as const,
  vat_rate: '5.5',
  price: 200,
  tax: 11,
  _destroy: false,
}

describe('parseInvoiceLineToForm', () => {
  test('should parse invoice line to form', () => {
    expect(parseInvoiceLineToForm(apiInvoiceLine as any)).toEqual(
      invoiceLineExpected
    )
  })
})

describe('parseApiToForm', () => {
  test('should parse api to form', () => {
    const invoiceExpected = {
      date: '2021-01-01',
      deadline: '2021-01-01',
      customer: apiCustomer,
      invoiceLines: [invoiceLineExpected],
    }
    expect(parseApiToForm(apiInvoice as any)).toEqual(invoiceExpected)
  })
})

describe('parseInvoiceLineToApi', () => {
  test('should parse invoice line to api without product', () => {
    expect(parseInvoiceLineToApi({} as any)).toEqual(null)
  })

  test('should parse invoice line to api with product', () => {
    expect(parseInvoiceLineToApi(formInvoiceLine)).toEqual(
      expectedApiInvoiceLine
    )
  })
})

describe('parseFormToApi', () => {
  const invoice = {
    date: '2021-01-01',
    deadline: '2021-01-01',
    customer: apiCustomer,
    invoiceLines: [formInvoiceLine],
  }

  test('should handle current invoiceLines', () => {
    expect(parseFormToApi(invoice as any)).toEqual({
      date: '2021-01-01',
      deadline: '2021-01-01',
      invoice_lines_attributes: [expectedApiInvoiceLine],
    })
  })

  test('should handle new invoiceLines', () => {
    const formValues = invoice as any

    const defaultValues = {
      ...invoice,
      invoiceLines: [
        ...invoice.invoiceLines,
        {
          ...formInvoiceLine,
          id: 2,
        },
      ],
    } as any

    expect(parseFormToApi(formValues, defaultValues)).toEqual({
      date: '2021-01-01',
      deadline: '2021-01-01',
      invoice_lines_attributes: [
        expectedApiInvoiceLine,
        { id: 2, _destroy: true },
      ],
    })
  })
})
