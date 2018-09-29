import React, { Fragment } from 'react'

import { Box, Text, Measure } from 'rebass/emotion'
import PropTypes from 'prop-types'

const PageCenter = ({ children }) => (
  <Measure my="0" mx="auto" maxWidth={992}>
    {children}
  </Measure>
)
PageCenter.propTypes = {
  children: PropTypes.node.isRequired,
}

const Header = () => (
  <Box is="header" bg="blue" p={3}>
    <PageCenter>
      <Text color="white" fontSize={3}>
        ✉️ 🌏 The Eod Machine
      </Text>
    </PageCenter>
  </Box>
)

const Main = ({ children }) => (
  <Box is="main" mt={4}>
    <PageCenter>{children}</PageCenter>
  </Box>
)
Main.propTypes = {
  children: PropTypes.node.isRequired,
}

const App = ({ children }) => (
  <Fragment>
    <Header />
    <Main>{children}</Main>
  </Fragment>
)
App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
