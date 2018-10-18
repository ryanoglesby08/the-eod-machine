import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { withCookies } from 'react-cookie'

import { Heading, Box, Button } from 'rebass/emotion'

import { groupBy } from 'lodash'

import CATEGORIES from './categories'
import CategoryEntry from './CategoryEntry'

export const GET_EOD = gql`
  query Eod($teamId: String!) {
    eod(teamId: $teamId) {
      entries {
        category
        content
      }
    }
  }
`

export const ADD_TO_EOD = gql`
  mutation AddToEod($entries: [EntryInput]!, $teamId: String!) {
    addToEod(entries: $entries, teamId: $teamId) {
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
    teamId: this.props.cookies.get('team'),
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

  clearEntries = () => {
    this.setState({ entriesByCategory: {} })
  }

  render() {
    const { teamId, entriesByCategory } = this.state

    return (
      <FetchEod teamId={teamId}>
        {eod => {
          const savedEntries = eod ? eod.entries : []
          const savedEntriesByCategory = groupBy(savedEntries, 'category')

          return (
            <EodForm
              savedEntriesByCategory={savedEntriesByCategory}
              entriesByCategory={entriesByCategory}
              teamId={teamId}
              onChange={this.onChange}
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

const onSubmit = (entriesByCategory, teamId, addToEod) => {
  const entries = Object.keys(entriesByCategory)
    .filter(category => entriesByCategory[category] !== '')
    .map(category => ({
      category,
      content: entriesByCategory[category],
    }))

  addToEod({
    variables: { entries, teamId },
  })
}

const EodForm = ({
  savedEntriesByCategory,
  entriesByCategory,
  teamId,
  onChange,
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
            onSubmit(entriesByCategory, teamId, addToEod)
          }}
        >
          {CATEGORIES.map(category => (
            <CategoryEntry
              key={category}
              category={category}
              entry={entriesByCategory[category]}
              savedEntries={savedEntriesByCategory[category]}
              onChange={onChange}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Fragment>
    )}
  </Mutation>
)
EodForm.propTypes = {
  savedEntriesByCategory: PropTypes.object.isRequired,
  entriesByCategory: PropTypes.object.isRequired,
  teamId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitComplete: PropTypes.func.isRequired,
}

export default withCookies(EnterEod)
