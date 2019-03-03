import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Box, Text, Flex } from 'rebass/emotion'
import styled from 'react-emotion'

import PageCenter from '../PageCenter'
import NavLink from './NavLink'

const LogoLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:active, &:visited': {
    color: 'inherit',
  },
})

const Header = ({ nav }) => (
  <Box is="header" bg="blue" p={3} color="white">
    <PageCenter>
      <Flex alignItems="center">
        <Text fontSize={3}>
          <LogoLink to="/">✉️ 🌏 The Eod Machine</LogoLink>
        </Text>

        <Box ml="auto">
          <Flex alignItems="center">
            <NavLink to="/teams">Manage teams</NavLink>
            {nav}
          </Flex>
        </Box>
      </Flex>
    </PageCenter>
  </Box>
)
Header.propTypes = {
  nav: PropTypes.node.isRequired,
}

export default Header
