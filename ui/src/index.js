import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider as RebassProvider } from 'rebass/emotion'

import EnterEod from './EnterEod/EnterEod'
import Teams from './Teams/Teams'
import EditTeam from './Teams/EditTeam'
import NewTeam from './Teams/NewTeam'

import registerServiceWorker from './registerServiceWorker'

const uri =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:4000/api/graphql'
    : '/api/graphql'
const apiClient = new ApolloClient({ uri })

ReactDOM.render(
  <Router>
    <ApolloProvider client={apiClient}>
      <RebassProvider>
        <Route exact path="/" component={EnterEod} />
        <Route exact path="/teams" component={Teams} />
        <Route path="/teams/new" component={NewTeam} />
        <Route path="/teams/:id/edit" component={EditTeam} />
      </RebassProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
