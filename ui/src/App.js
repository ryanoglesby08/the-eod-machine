import React from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import logo from './logo.svg'
import './App.css'

const SAY_HELLO = gql`
  {
    hello {
      message
    }
  }
`

const App = () => (
  <Query query={SAY_HELLO}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            The message from the API is: {data.hello.message}
          </p>
        </div>
      )
    }}
  </Query>
)

export default App
