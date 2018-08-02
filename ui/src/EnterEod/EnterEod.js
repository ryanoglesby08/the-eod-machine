import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { Button, Label, Textarea } from 'rebass/emotion'

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

const categories = [
  'Business as Usual',
  'Story Movements',
  'Open Questions',
  'Blockers',
  'Action Items',
  'Other',
]

const toHtmlId = text => text.toLowerCase().replace(/ /g, '-')

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
        {({ loading, error, data }) => {
          const fetchedData = data

          return (
            <Mutation
              mutation={ADD_TO_EOD}
              update={(cache, { data: { addToEod } }) => {
                const { eod } = cache.readQuery({ query: GET_EOD })

                eod.entries = eod.entries.concat(addToEod)

                cache.writeQuery({
                  query: GET_EOD,
                  data: { eod },
                })
              }}
            >
              {addToEod => (
                <form
                  onSubmit={e => {
                    e.preventDefault()

                    this.onSubmit(addToEod)
                  }}
                >
                  {categories.map(category => (
                    <div key={category}>
                      <ul data-testid={category}>
                        {!loading &&
                          !error &&
                          fetchedData.eod.entries &&
                          fetchedData.eod.entries
                            .filter(entry => entry.category === category)
                            .map(entry => (
                              <li key={entry.content}>{entry.content}</li>
                            ))}
                      </ul>

                      <Label htmlFor={toHtmlId(category)}>{category}</Label>
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
