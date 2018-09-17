import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { Button } from 'rebass/emotion'

import CATEGORIES from './categories'
import CategoryEntry from './CategoryEntry'

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

// TODO lodash
const groupBy = (array, key) =>
  array.reduce((groupsByKey, element) => {
    const value = element[key]

    return {
      ...groupsByKey,
      [value]: (groupsByKey[value] || []).concat(element),
    }
  }, {})

class EnterEod extends Component {
  state = {
    entriesByCategory: {},
  }

  onChange = (category, content) => {
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
          const savedEntriesByCategory = groupBy(savedEntries, 'category')

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
                  {CATEGORIES.map(category => (
                    <CategoryEntry
                      key={category}
                      category={category}
                      entry={entriesByCategory[category]}
                      savedEntries={savedEntriesByCategory[category]}
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
