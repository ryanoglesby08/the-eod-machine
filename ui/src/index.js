import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const uri =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:4000/api/graphql'
    : '/api/graphql'
const apiClient = new ApolloClient({ uri })

ReactDOM.render(
  <ApolloProvider client={apiClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
