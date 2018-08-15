import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

const API_HOST = process.env.API_HOST || 'localhost'
const apiUri = `http://${API_HOST}:4000/api/graphql`

module.exports = new ApolloClient({
  link: new HttpLink({
    uri: apiUri,
    fetch,
    ssrMode: true,
  }),
  cache: new InMemoryCache(),
})
