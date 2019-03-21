import React from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Box, Button, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'
import CATEGORIES from './categories'
import { updateGetTeamWithEodQuery } from './FetchTeamWithEod'
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
    update={updateGetTeamWithEodQuery(teamId)}
    onCompleted={onSubmitComplete}
  >
    {addToEod => (
      <>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(author, entriesByCategory, teamId, addToEod)
          }}
        >
          <LabeledField label="Author">
            {id => (
              <Input
                id={id}
                value={author}
                onChange={e => onAuthorChange(e.target.value)}
              />
            )}
          </LabeledField>

          <Box mt={3}>
            {CATEGORIES.map(category => (
              <Box mb={3} key={category}>
                <CategoryEntry
                  category={category}
                  entry={entriesByCategory[category]}
                  savedEntries={savedEntriesByCategory[category]}
                  onChange={onEntryChange}
                />
              </Box>
            ))}
          </Box>

          <Box mt={3}>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </>
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
