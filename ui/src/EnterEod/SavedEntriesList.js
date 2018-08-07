import React from 'react'

import toHtmlId from './toHtmlId'

const SavedEntriesList = ({ category, entries }) => (
  <ul data-testid={toHtmlId(category)}>
    {entries.map(entry => <li key={entry.content}>{entry.content}</li>)}
  </ul>
)

export default SavedEntriesList
