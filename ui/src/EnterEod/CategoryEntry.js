import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Textarea, Box } from 'rebass/emotion'

import CATEGORIES from './categories'
import { EntryShape } from './schemas'
import SavedEntriesList from './SavedEntriesList'
import LabeledField from '../ui-components/LabeledField/LabeledField'

const CategoryEntry = ({ category, entry, savedEntries, onChange }) => (
  <Box mb={4}>
    <LabeledField label={category} fontSize={2}>
      {id => (
        <Fragment>
          <Textarea
            id={id}
            rows={3}
            value={entry}
            onChange={e => onChange(category, e.target.value)}
          />

          <SavedEntriesList category={category} entries={savedEntries} />
        </Fragment>
      )}
    </LabeledField>
  </Box>
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
