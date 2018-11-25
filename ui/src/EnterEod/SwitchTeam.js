import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'react-emotion'
import { Text } from 'rebass/emotion'

const InverseLink = styled(Link)({
  color: 'inherit',
})

const SwitchTeam = () => (
  <Text color="white">
    <InverseLink to="select-team">Switch teams</InverseLink>
  </Text>
)

export default SwitchTeam
