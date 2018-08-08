import React from 'react'

import { Label, Textarea } from 'rebass/emotion'

import toHtmlId from './toHtmlId'
import SavedEntriesList from './SavedEntriesList'

const CategoryEntry = ({ category, entry, savedEntries, onChange }) => {
  const inputId = toHtmlId(category)
  const savedEntriesForCategory = savedEntries.filter(
    entry => entry.category === category
  )

  return (
    <div>
      <Label htmlFor={inputId}>{category}</Label>

      {savedEntries && (
        <SavedEntriesList
          category={category}
          entries={savedEntriesForCategory}
        />
      )}

      <Textarea
        id={inputId}
        value={entry}
        onChange={e => onChange(category, e.target.value)}
      />
    </div>
  )
}

CategoryEntry.defaultProps = {
  entry: '',
}

export default CategoryEntry
