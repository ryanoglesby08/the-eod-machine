import React, { Fragment } from 'react'

import { Textarea } from 'rebass/emotion'

import SavedEntriesList from './SavedEntriesList'

import LabeledField from '../ui-components/LabeledField/LabeledField'

const CategoryEntry = ({ category, entry, savedEntries, onChange }) => {
  const savedEntriesForCategory = savedEntries.filter(
    entry => entry.category === category
  )

  return (
    <div>
      <LabeledField label={category}>
        {id => (
          <Fragment>
            <SavedEntriesList
              category={category}
              entries={savedEntriesForCategory}
            />

            <Textarea
              id={id}
              value={entry}
              onChange={e => onChange(category, e.target.value)}
            />
          </Fragment>
        )}
      </LabeledField>
    </div>
  )
}

CategoryEntry.defaultProps = {
  entry: '',
}

export default CategoryEntry
