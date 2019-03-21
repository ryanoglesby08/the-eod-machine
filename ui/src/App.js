import React from 'react'
import PropTypes from 'prop-types'

import { Box } from 'rebass/emotion'

import PageCenter from './PageCenter'

const App = ({ children }) => (
  <Box is="main" mt={4} mb={4} px={3}>
    <PageCenter>{children}</PageCenter>
  </Box>
)
App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
