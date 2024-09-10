import { components, operations } from 'api/schema'

export type Invoice =
  operations['getInvoices']['responses']['200']['content']['application/json']['invoices'][0]

export type Product = components['schemas']['Product']

export type Customer = components['schemas']['Customer']
