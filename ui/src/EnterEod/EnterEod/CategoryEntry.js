import React from 'react'
import PropTypes from 'prop-types'

import { Textarea } from 'rebass/emotion'

import CATEGORIES from './categories'
import { EntryShape } from './schemas'
import SavedEntriesList from './SavedEntriesList'
import LabeledField from '../../ui-components/LabeledField/LabeledField'

const CategoryEntry = ({ category, entry, savedEntries, onChange }) => (
  <LabeledField label={category} fontSize={2}>
    {id => (
      <>
        <Textarea
          id={id}
          rows={3}
          value={entry}
          onChange={e => onChange(category, e.target.value)}
        />

        <SavedEntriesList category={category} entries={savedEntries} />
      </>
    )}
  </LabeledField>
)

CategoryEntry.propTypes = {
  category: PropTypes.oneOf(CATEGORIES).isRequired,
  entry: PropTypes.string.isRequired,
  savedEntries: PropTypes.arrayOf(EntryShape).isRequired,
  onChange: PropTypes.func.isRequired,
}
CategoryEntry.defaultProps = {
  entry: '',
  savedEntries: [],
}

export default CategoryEntry
