import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Alert, Badge, Pagination, Placeholder, Stack } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import useInvoices from 'app/hooks/useInvoices'
import { paths } from 'app/paths'
import { formatCurrency } from 'app/utils/formatCurrency'
import { formatDate } from 'app/utils/formatDate'

import { type Invoice } from 'types'

const today = new Date()

type Column = ColumnDef<Invoice>

const InvoiceTable = () => {
  const columns = useMemo<Column[]>(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        cell: (row) => (
          <Link to={paths.invoices.show(row.row.original.id)}>
            {row.row.original.id}
          </Link>
        ),
      },
      {
        header: 'Customer',
        accessorKey: 'customer',
        accessorFn: (row) =>
          `${row.customer?.first_name} ${row.customer?.last_name}`,
      },
      {
        header: 'Address',
        accessorKey: 'address',
        accessorFn: (row) =>
          `${row.customer?.address}, ${row.customer?.zip_code} ${row.customer?.city}`,
      },
      {
        header: 'Total',
        accessorKey: 'total',
        accessorFn: (row) => formatCurrency(row.total),
      },
      {
        header: 'Tax',
        accessorKey: 'tax',
        accessorFn: (row) => formatCurrency(row.tax),
      },
      {
        header: 'Finalized',
        accessorKey: 'finalized',
        accessorFn: (row) => (row.finalized ? 'Yes' : 'No'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        accessorFn: (row) => formatDate(row.date),
      },
      {
        header: 'Status',
        accessorKey: 'deadline',
        cell: (row) => {
          const invoice = row.row.original
          const deadline = invoice.deadline

          if (!deadline) {
            return null
          }

          if (invoice.paid) {
            return <Badge bg="success">Paid</Badge>
          }

          return (
            <span>
              {new Date(deadline) < today && (
                <Badge bg="danger">Past due {formatDate(deadline)}</Badge>
              )}
            </span>
          )
        },
      },
    ],
    []
  )

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useInvoices(pagination)

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    data: dataQuery?.data?.invoices ?? defaultData,
    columns,
    rowCount: dataQuery.data?.pagination?.total_entries,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  if (dataQuery.error) {
    return <Alert variant="warning">There was an error loading the data</Alert>
  }

  if (dataQuery.isLoading) {
    return (
      <Placeholder animation="glow">
        <Placeholder xs={12} />
        <Placeholder xs={12} />
        <Placeholder xs={12} />
      </Placeholder>
    )
  }

  if (dataQuery.data?.invoices.length === 0) {
    return (
      <Alert variant="info">There are no invoices matching your filters</Alert>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Invoices (${dataQuery.data?.pagination?.total_entries})`}</title>
      </Helmet>
      <table className="table table-bordered table-striped">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Stack direction="horizontal" gap={4} className="justify-content-center">
        <Pagination style={{ marginBottom: '0px' }}>
          <Pagination.First
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Pagination.Prev
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Pagination.Next
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <Pagination.Last
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          />
        </Pagination>
        <span className="flex items-center gap-1">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount().toLocaleString()}
        </span>
      </Stack>
    </>
  )
}

export default InvoiceTable
