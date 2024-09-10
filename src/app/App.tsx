import { Helmet } from 'react-helmet'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import InvoiceEdit from './components/InvoiceEdit'
import InvoiceNew from './components/InvoiceNew'
import InvoiceShow from './components/InvoiceShow'
import InvoicesList from './components/InvoicesList'

function App() {
  return (
    <>
      <Helmet defaultTitle="Invoices" />
      <div className="px-5">
        <Router>
          <Routes>
            <Route path="/invoices/:id" element={<InvoiceShow />}>
              <Route path="edit" element={<InvoiceEdit />} />
            </Route>
            <Route path="/" element={<InvoicesList />}>
              <Route path="new" element={<InvoiceNew />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
