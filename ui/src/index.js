import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider as RebassProvider } from 'rebass/emotion'

import './global-styles.js'

import App from './App'
import EnterEodForTeam from './EnterEod/EnterEodForTeam'
import Teams from './Teams/Teams/Teams'
import EditTeam from './Teams/EditTeam/EditTeam'
import NewTeam from './Teams/NewTeam/NewTeam'

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
        <App>
          <Route exact path="/" component={EnterEodForTeam} />
          <Route exact path="/teams" component={Teams} />
          <Route path="/teams/new" component={NewTeam} />
          <Route path="/teams/:id/edit" component={EditTeam} />
        </App>
      </RebassProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
