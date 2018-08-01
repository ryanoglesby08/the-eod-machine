import React, { Component } from 'react'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Button, Label, Textarea } from 'rebass/emotion'

export const ADD_TO_EOD = gql`
  mutation AddToEod($entries: [EntryInput]!) {
    addToEod(entries: $entries) {
      entries {
        category
        content
      }
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
      <Mutation mutation={ADD_TO_EOD}>
        {(addToEod, { data }) => (
          <form
            onSubmit={e => {
              e.preventDefault()

              this.onSubmit(addToEod)
            }}
          >
            <p>Current EOD: {JSON.stringify(data)}</p>

            {categories.map(category => (
              <div key={category}>
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
  }
}

export default EnterEod
