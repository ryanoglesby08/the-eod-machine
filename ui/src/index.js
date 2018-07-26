import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { Provider } from 'rebass/emotion'

// import './index.css'
// import App from './App'
import EnterEod from './EnterEod/EnterEod'
import registerServiceWorker from './registerServiceWorker'

const uri =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:4000/api/graphql'
    : '/api/graphql'
const apiClient = new ApolloClient({ uri })

ReactDOM.render(
  <ApolloProvider client={apiClient}>
    <Provider>
      <EnterEod />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
