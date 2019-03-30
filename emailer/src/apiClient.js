import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

const API_HOST = process.env.API_HOST || 'localhost'
const API_PORT = process.env.API_PORT || '4000'
const apiUri = `http://${API_HOST}:${API_PORT}`

export default new ApolloClient({
  link: new HttpLink({
    uri: apiUri,
    fetch,
    ssrMode: true,
  }),
  cache: new InMemoryCache(),
})
