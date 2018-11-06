import PropTypes from 'prop-types'
import CATEGORIES from './categories'

export const EntryShape = PropTypes.shape({
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.oneOf(CATEGORIES).isRequired,
})
