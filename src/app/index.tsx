import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const domRoot = document.getElementById('root')
const root = createRoot(domRoot!)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
