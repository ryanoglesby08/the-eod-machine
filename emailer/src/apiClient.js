const ApolloClient = require('apollo-client').default
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

const config = require('./config')

module.exports = new ApolloClient({
  link: new HttpLink({
    uri: `${config.apiUrl}/api/graphql`,
    fetch,
    ssrMode: true,
  }),
  cache: new InMemoryCache(),
})
