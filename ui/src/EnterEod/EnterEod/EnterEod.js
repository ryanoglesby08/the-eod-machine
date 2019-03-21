import React, { Component } from 'react'

import { withCookies } from 'react-cookie'

import { Heading, Box } from 'rebass/emotion'

import { groupBy } from 'lodash'

import FetchTeamWithEod from './FetchTeamWithEod'
import EodForm from './EodForm'

class EnterEod extends Component {
  state = {
    author: '',
    entriesByCategory: {},
  }

  onAuthorChange = author => {
    this.setState({ author })
  }

  onEntryChange = (category, content) => {
    this.setState(prevState => {
      const { entriesByCategory } = prevState

      return {
        ...prevState,
        entriesByCategory: {
          ...entriesByCategory,
          [category]: content,
        },
      }
    })
  }

  clearEntries = () => {
    this.setState({ author: '', entriesByCategory: {} })
  }

  render() {
    const { cookies } = this.props
    const { author, entriesByCategory } = this.state

    const teamId = cookies.get('team')

    return (
      <FetchTeamWithEod id={teamId}>
        {team => {
          const savedEntriesByCategory = groupBy(team.currentEod, 'category')

          return (
            <>
              <Heading>Enter your EOD update for {team.name}</Heading>

              <Box mt={3}>
                <EodForm
                  author={author}
                  onAuthorChange={this.onAuthorChange}
                  entriesByCategory={entriesByCategory}
                  savedEntriesByCategory={savedEntriesByCategory}
                  onEntryChange={this.onEntryChange}
                  teamId={teamId}
                  onSubmitComplete={this.clearEntries}
                />
              </Box>
            </>
          )
        }}
      </FetchTeamWithEod>
    )
  }
}

export default withCookies(EnterEod)
