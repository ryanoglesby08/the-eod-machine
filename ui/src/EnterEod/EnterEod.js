import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { Button } from 'rebass/emotion'

import CategoryEntry from './CategoryEntry'

const categories = [
  'Business as Usual',
  'Story Movements',
  'Open Questions',
  'Blockers',
  'Action Items',
  'Other',
]

export const GET_EOD = gql`
  {
    eod {
      entries {
        category
        content
      }
    }
  }
`

export const ADD_TO_EOD = gql`
  mutation AddToEod($entries: [EntryInput]!) {
    addToEod(entries: $entries) {
      category
      content
    }
  }
`

const updateQuery = (cache, { data: { addToEod } }) => {
  const { eod } = cache.readQuery({ query: GET_EOD })

  eod.entries = eod.entries.concat(addToEod)

  cache.writeQuery({
    query: GET_EOD,
    data: { eod },
  })
}

class EnterEod extends Component {
  state = {
    entriesByCategory: {},
  }

  onChange = (category, content) => {
    this.setState(({ entriesByCategory }) => {
      entriesByCategory[category] = content
      return { entriesByCategory }
    })
  }

  onSubmit = addToEod => {
    const { entriesByCategory } = this.state

    const entries = Object.keys(entriesByCategory)
      .filter(category => entriesByCategory[category] !== '')
      .map(category => ({
        category,
        content: entriesByCategory[category],
      }))

    addToEod({
      variables: { entries },
    })
  }

  clearEntries = () => {
    this.setState({ entriesByCategory: {} })
  }

  render() {
    const { entriesByCategory } = this.state

    return (
      <Query query={GET_EOD}>
        {({ data: { eod } }) => {
          const savedEntries = eod ? eod.entries : []

          return (
            <Mutation
              mutation={ADD_TO_EOD}
              update={updateQuery}
              onCompleted={this.clearEntries}
            >
              {addToEod => (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.onSubmit(addToEod)
                  }}
                >
                  {categories.map(category => (
                    <CategoryEntry
                      key={category}
                      category={category}
                      entry={entriesByCategory[category]}
                      savedEntries={savedEntries}
                      onChange={this.onChange}
                    />
                  ))}

                  <div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default EnterEod
