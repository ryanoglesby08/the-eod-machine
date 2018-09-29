import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

import { Heading, Box, Button } from 'rebass/emotion'

import { groupBy } from 'lodash'

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

  clearEntries = () => {
    this.setState({ entriesByCategory: {} })
  }

  render() {
    const { entriesByCategory } = this.state

    return (
      <FetchEod>
        {eod => {
          const savedEntries = eod ? eod.entries : []
          const savedEntriesByCategory = groupBy(savedEntries, 'category')

          return (
            <EodForm
              savedEntriesByCategory={savedEntriesByCategory}
              entriesByCategory={entriesByCategory}
              onChange={this.onChange}
              onSubmitComplete={this.clearEntries}
            />
          )
        }}
      </FetchEod>
    )
  }
}

const FetchEod = ({ children }) => (
  <Query query={GET_EOD}>
    {({ data: { eod } }) => {
      return children(eod)
    }}
  </Query>
)
FetchEod.propTypes = {
  children: PropTypes.func.isRequired,
}

const onSubmit = (entriesByCategory, addToEod) => {
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

const EodForm = ({
  savedEntriesByCategory,
  entriesByCategory,
  onChange,
  onSubmitComplete,
}) => (
  <Mutation
    mutation={ADD_TO_EOD}
    update={updateQuery}
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
            onSubmit(entriesByCategory, addToEod)
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
  onChange: PropTypes.func.isRequired,
  onSubmitComplete: PropTypes.func.isRequired,
}

export default EnterEod
