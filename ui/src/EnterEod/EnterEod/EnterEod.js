import React, { Component } from 'react'

import { withCookies } from 'react-cookie'

import { groupBy } from 'lodash'

import FetchEod from './FetchEod'
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
      <FetchEod teamId={teamId}>
        {eod => {
          const savedEntries = eod ? eod.entries : []
          const savedEntriesByCategory = groupBy(savedEntries, 'category')

          return (
            <EodForm
              author={author}
              onAuthorChange={this.onAuthorChange}
              entriesByCategory={entriesByCategory}
              savedEntriesByCategory={savedEntriesByCategory}
              onEntryChange={this.onEntryChange}
              teamId={teamId}
              onSubmitComplete={this.clearEntries}
            />
          )
        }}
      </FetchEod>
    )
  }
}

export default withCookies(EnterEod)
