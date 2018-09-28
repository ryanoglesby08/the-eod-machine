import React from 'react'
import PropTypes from 'prop-types'

import { Box, colors } from 'rebass/emotion'

const css = {
  font: 'inherit',
  border: 0,

  '&:hover, &:focus': {
    backgroundColor: colors.gray,
  },
}

const ClickableRow = ({ children, ...rest }) => (
  <Box {...rest} is="button" width="100%" p={3} bg="transparent" css={css}>
    {children}
  </Box>
)
ClickableRow.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClickableRow
