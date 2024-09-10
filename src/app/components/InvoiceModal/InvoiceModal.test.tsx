import { fireEvent } from '@testing-library/react'
import selectEvent from 'react-select-event'

import { client } from 'api'

import { render, screen } from 'app/test-utils'

import { InvoiceModal, InvoiceModalProps } from './InvoiceModal'

const setup = (props: InvoiceModalProps) => {
  return render(<InvoiceModal {...props} />)
}

jest.mock('api', () => ({
  ...jest.requireActual('api'),
  client: {
    GET: jest.fn(),
  },
}))

describe('InvoiceModal', () => {
  test('should render', () => {
    setup({
      onSubmit: jest.fn(),
      onClose: jest.fn(),
      title: 'Invoice',
      saveAction: 'Save',
    })

    expect(screen.getByText('Invoice')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  test('should select a customer', async () => {
    const GET = client.GET as jest.Mock

    GET.mockResolvedValue({
      data: {
        customers: [
          {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
          },
        ],
      },
    })

    setup({
      onSubmit: jest.fn(),
      onClose: jest.fn(),
      title: 'Invoice',
      saveAction: 'Save',
    })

    fireEvent.change(screen.getByLabelText('Customer'), {
      target: { value: 'John' },
    })

    await selectEvent.select(screen.getByLabelText('Customer'), 'John Doe')
  })
})
