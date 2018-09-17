import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Textarea } from 'rebass/emotion'

import CATEGORIES from './categories'
import { EntryShape } from './schemas'
import SavedEntriesList from './SavedEntriesList'
import LabeledField from '../ui-components/LabeledField/LabeledField'

const CategoryEntry = ({ category, entry, savedEntries, onChange }) => (
  <div>
    <LabeledField label={category}>
      {id => (
        <Fragment>
          <SavedEntriesList category={category} entries={savedEntries} />

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
