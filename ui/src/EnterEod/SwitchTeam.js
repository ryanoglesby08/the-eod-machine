import React from 'react'

import { Link } from 'react-router-dom'

import { Box } from 'rebass/emotion'

const InverseLink = props => <Box {...props} is={Link} color="white" />

const SwitchTeam = () => (
  <InverseLink to="select-team">Switch teams</InverseLink>
)

export default SwitchTeam
