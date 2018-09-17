import PropTypes from 'prop-types'
import CATEGORIES from './categories'

export const EntryShape = PropTypes.shape({
  content: PropTypes.string.isRequired,
  category: PropTypes.oneOf(CATEGORIES).isRequired,
})
