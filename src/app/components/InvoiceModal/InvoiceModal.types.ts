import { Customer, Product } from 'types'

export interface InvoiceLine {
  id?: number
  quantity: string
  product?: Product
  _destroy?: boolean
}

export interface InvoiceFormProps {
  date: string | null
  deadline: string | null
  customer?: Customer | null
  invoiceLines: InvoiceLine[]
}
