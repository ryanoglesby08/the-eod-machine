import React from 'react'
import PropTypes from 'prop-types'

import { EntryShape } from './schemas'
import CATEGORIES from './categories'
import toHtmlId from '../ui-components/LabeledField/toHtmlId'

const SavedEntriesList = ({ category, entries }) => {
  if (!entries) {
    return null
  }

  return (
    <ul data-testid={toHtmlId(category)}>
      {entries.map(entry => <li key={entry.content}>{entry.content}</li>)}
    </ul>
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
