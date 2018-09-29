import React from 'react'
import PropTypes from 'prop-types'

import { Box, Panel, Text } from 'rebass/emotion'

import { EntryShape } from './schemas'
import CATEGORIES from './categories'
import toHtmlId from '../ui-components/LabeledField/toHtmlId'
import BareList from '../ui-components/BareList/BareList'

const SavedEntriesList = ({ category, entries }) => {
  if (entries.length === 0) {
    return null
  }

  return (
    <div>
      <Box mb={1}>
        <Text fontSize={1}>Updates from your team</Text>
      </Box>

      <BareList data-testid={toHtmlId(category)}>
        {entries.map(entry => (
          <li key={entry.content}>
            <Panel py={1} px={2} mb={1}>
              <Text fontSize={1}>{entry.content}</Text>
            </Panel>
          </li>
        ))}
      </BareList>
    </div>
  )
}
SavedEntriesList.propTypes = {
  category: PropTypes.oneOf(CATEGORIES).isRequired,
  entries: PropTypes.arrayOf(EntryShape).isRequired,
}
SavedEntriesList.defaultProps = {
  entries: [],
}

export default SavedEntriesList
