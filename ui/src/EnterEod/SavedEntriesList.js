import React from 'react'

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

export default SavedEntriesList
