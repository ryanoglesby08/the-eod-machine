import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'

class RedirectToTeams extends Component {
  state = {
    toTeamsList: false,
  }

  doRedirect = () => {
    this.setState({ toTeamsList: true })
  }

  render() {
    const { toTeamsList } = this.state
    const { children } = this.props

    if (toTeamsList) {
      return <Redirect to="/teams" push />
    }

    return children(this.doRedirect)
  }
}
RedirectToTeams.propTypes = {
  children: PropTypes.func.isRequired,
}

export default RedirectToTeams
