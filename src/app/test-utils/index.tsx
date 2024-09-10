import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  render as renderBase,
  renderHook as renderHookBase,
  screen,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const queryClient = new QueryClient()

const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

const render = (ui: any) => {
  return renderBase(ui, { wrapper: TestProviders })
}

const renderHook = (hook: any) => {
  return renderHookBase(hook, { wrapper: TestProviders })
}

export { render, renderHook, screen }
