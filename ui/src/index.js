import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider as RebassProvider } from 'rebass/emotion'

import './global-styles.js'

import App from './App'
import Header from './Header/Header'
import SwitchTeam from './Header/SwitchTeam'
import TeamRequiredRoute from './EnterEod/SelectTeam/TeamRequiredRoute'
import SelectTeam from './EnterEod/SelectTeam/SelectTeam'
import EnterEod from './EnterEod/EnterEod/EnterEod'
import Teams from './Teams/Teams/Teams'
import EditTeam from './Teams/EditTeam/EditTeam'
import NewTeam from './Teams/NewTeam/NewTeam'

import registerServiceWorker from './registerServiceWorker'

const API_HOST = process.env.API_HOST || 'localhost'
const API_PORT = process.env.API_PORT || '4000'
const apiClient = new ApolloClient({ uri: `http://${API_HOST}:${API_PORT}` })

ReactDOM.render(
  <Router>
    <ApolloProvider client={apiClient}>
      <RebassProvider>
        <Header nav={<Route path="/" exact component={SwitchTeam} />} />
        <App>
          <TeamRequiredRoute path="/" exact component={EnterEod} />
          {/* PropTypes warning will be fixed in react-router 4.4. https://github.com/ReactTraining/react-router/issues/4354 */}
          <Route path="/select-team" component={SelectTeam} />
          <Route path="/teams" exact component={Teams} />
          <Route path="/teams/new" component={NewTeam} />
          <Route path="/teams/:id/edit" component={EditTeam} />
        </App>
      </RebassProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
