import React from 'react'
import PropTypes from 'prop-types'

import { Measure } from 'rebass/emotion'

const PageCenter = ({ children }) => (
  <Measure my="0" mx="auto" maxWidth={992}>
    {children}
  </Measure>
)
PageCenter.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageCenter
