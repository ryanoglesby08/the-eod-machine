import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Heading, Box, Button, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'
import CATEGORIES from './categories'
import { updateGetEodQuery } from './FetchEod'
import CategoryEntry from './CategoryEntry'

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
    update={updateGetEodQuery(teamId)}
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

export default EodForm
