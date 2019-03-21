import React from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { Text } from 'rebass/emotion'

const ShowCreateATeamFallback = ({ teams, children }) => {
  if (isEmpty(teams)) {
    return (
      <Text>
        You'll need to create a team before you can enter an EOD update.
      </Text>
    )
  }

  return children(teams)
}
ShowCreateATeamFallback.propTypes = {
  teams: PropTypes.array,
  children: PropTypes.func.isRequired,
}

export default ShowCreateATeamFallback
