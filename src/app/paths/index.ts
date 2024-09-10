export const paths = {
  invoices: {
    base: () => '/',
    new: () => '/new',
    show: (id: number | string) => `/invoices/${id}`,
    edit: (id: number | string) => `/invoices/${id}/edit`,
  },
}
