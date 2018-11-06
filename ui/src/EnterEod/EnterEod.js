import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { withCookies } from 'react-cookie'

import { Heading, Box, Button, Input } from 'rebass/emotion'

import { groupBy } from 'lodash'

import CATEGORIES from './categories'
import CategoryEntry from './CategoryEntry'
import LabeledField from '../ui-components/LabeledField/LabeledField'

export const GET_EOD = gql`
  query Eod($teamId: String!) {
    eod(teamId: $teamId) {
      entries {
        author
        category
        content
      }
    }
  }
`

export const ADD_TO_EOD = gql`
  mutation AddToEod(
    $author: String!
    $entries: [EntryInput]!
    $teamId: String!
  ) {
    addToEod(author: $author, entries: $entries, teamId: $teamId) {
      author
      category
      content
    }
  }
`

const updateQuery = teamId => (cache, { data: { addToEod } }) => {
  const { eod } = cache.readQuery({ query: GET_EOD, variables: { teamId } })

  eod.entries = eod.entries.concat(addToEod)

  cache.writeQuery({
    query: GET_EOD,
    variables: { teamId },
    data: { eod },
  })
}

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

  // TODO: Split this file apart!
  // TODO: Delete author-less entries from mongo

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

const FetchEod = ({ teamId, children }) => (
  <Query query={GET_EOD} variables={{ teamId }}>
    {({ data: { eod } }) => {
      return children(eod)
    }}
  </Query>
)
FetchEod.propTypes = {
  teamId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

const onSubmit = (author, entriesByCategory, teamId, addToEod) => {
  const entries = Object.keys(entriesByCategory)
    .filter(category => entriesByCategory[category] !== '')
    .map(category => ({
      category,
      content: entriesByCategory[category],
    }))

  addToEod({
    variables: { author, entries, teamId },
  })
}

const EodForm = ({
  author,
  savedEntriesByCategory,
  entriesByCategory,
  teamId,
  onAuthorChange,
  onEntryChange,
  onSubmitComplete,
}) => (
  <Mutation
    mutation={ADD_TO_EOD}
    update={updateQuery(teamId)}
    onCompleted={onSubmitComplete}
  >
    {addToEod => (
      <Fragment>
        <Box mb={3}>
          <Heading>Enter your EOD update</Heading>
        </Box>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(author, entriesByCategory, teamId, addToEod)
          }}
        >
          <Box mb={4}>
            <LabeledField label="Author">
              {id => (
                <Input
                  id={id}
                  value={author}
                  onChange={e => onAuthorChange(e.target.value)}
                />
              )}
            </LabeledField>
          </Box>

          {CATEGORIES.map(category => (
            <CategoryEntry
              key={category}
              category={category}
              entry={entriesByCategory[category]}
              savedEntries={savedEntriesByCategory[category]}
              onChange={onEntryChange}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Fragment>
    )}
  </Mutation>
)
EodForm.propTypes = {
  author: PropTypes.string.isRequired,
  onAuthorChange: PropTypes.func.isRequired,
  entriesByCategory: PropTypes.object.isRequired,
  savedEntriesByCategory: PropTypes.object.isRequired,
  onEntryChange: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  onSubmitComplete: PropTypes.func.isRequired,
}

export default withCookies(EnterEod)
