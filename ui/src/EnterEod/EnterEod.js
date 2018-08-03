import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { Button, Label, Textarea } from 'rebass/emotion'

import toHtmlId from './toHtmlId'
import EntriesForCategory from './EntriesForCategory'

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

const categories = [
  'Business as Usual',
  'Story Movements',
  'Open Questions',
  'Blockers',
  'Action Items',
  'Other',
]

class EnterEod extends Component {
  state = {}

  onChange = (category, content) => {
    this.setState({ [category]: content })
  }

  onSubmit = addToEod => {
    const entries = Object.keys(this.state).map(category => ({
      category,
      content: this.state[category],
    }))

    addToEod({
      variables: { entries },
    })
  }

  render() {
    return (
      <Query query={GET_EOD}>
        {({ data: { eod } }) => {
          return (
            <Mutation mutation={ADD_TO_EOD} update={updateQuery}>
              {addToEod => (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.onSubmit(addToEod)
                  }}
                >
                  {categories.map(category => (
                    <div key={category}>
                      <Label htmlFor={toHtmlId(category)}>{category}</Label>

                      {eod && (
                        <EntriesForCategory
                          category={category}
                          entries={eod.entries.filter(
                            entry => entry.category === category
                          )}
                        />
                      )}

                      <Textarea
                        id={toHtmlId(category)}
                        value={this.state[category]}
                        onChange={e => this.onChange(category, e.target.value)}
                      />
                    </div>
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
