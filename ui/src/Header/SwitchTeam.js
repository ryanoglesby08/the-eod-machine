import React from 'react'

import { Box } from 'rebass/emotion'

import NavLink from './NavLink'

const SwitchTeam = () => (
  <>
    <Box ml={1} is="span">
      |
    </Box>
    <Box ml={1}>
      <NavLink to="/select-team">Switch team</NavLink>
    </Box>
  </>
)

export default SwitchTeam
