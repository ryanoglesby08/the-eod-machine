import React from 'react'

import { Box, Text, Measure, Flex } from 'rebass/emotion'
import PropTypes from 'prop-types'

const PageCenter = ({ children }) => (
  <Measure my="0" mx="auto" maxWidth={992}>
    {children}
  </Measure>
)
PageCenter.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Header = ({ children }) => (
  <Box is="header" bg="blue" p={3}>
    <PageCenter>
      <Flex alignItems="center">
        <Text color="white" fontSize={3}>
          ✉️ 🌏 The Eod Machine
        </Text>

        <Box ml="auto">{children}</Box>
      </Flex>
    </PageCenter>
  </Box>
)
Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Main = ({ children }) => (
  <Box is="main" mt={4} px={3}>
    <PageCenter>{children}</PageCenter>
  </Box>
)
Main.propTypes = {
  children: PropTypes.node.isRequired,
}
