import createFetchClient, { type Middleware } from 'openapi-fetch'
import createClient from 'openapi-react-query'

import type { paths } from './schema'

const client = createFetchClient<paths>({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
})

const middleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set('X-Session', process.env.REACT_APP_API_X_SESSION!)
    return request
  },
}

client.use(middleware)

const $api = createClient(client)

export { $api, client }
