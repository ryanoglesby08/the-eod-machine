const ApolloClient = require('apollo-client').default
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

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
