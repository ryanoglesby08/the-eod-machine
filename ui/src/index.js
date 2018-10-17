import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider as RebassProvider } from 'rebass/emotion'

import './global-styles.js'

import { Header, Main } from './App'
import TeamRequiredRoute from './EnterEod/SelectTeam/TeamRequiredRoute'
import SelectTeam from './EnterEod/SelectTeam/SelectTeam'
import SwitchTeam from './EnterEod/SwitchTeam'
import EnterEod from './EnterEod/EnterEod'
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
        <Header>
          <Route path="/" exact component={SwitchTeam} />
        </Header>
        <Main>
          <TeamRequiredRoute path="/" exact component={EnterEod} />
          <Route path="/select-team" component={SelectTeam} />
          <Route path="/teams" exact component={Teams} />
          <Route path="/teams/new" component={NewTeam} />
          <Route path="/teams/:id/edit" component={EditTeam} />
        </Main>
      </RebassProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
