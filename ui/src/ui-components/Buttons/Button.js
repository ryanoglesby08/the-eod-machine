import React from 'react'
import { Button as RebassButton } from 'rebass/emotion'

const Button = props => (
  <RebassButton
    {...props}
    css={{
      '&:focus': {
        // Fix broken styling in rebass
        outline: ['1px dotted #212121', '5px auto -webkit-focus-ring-color'],
        boxShadow: 'inset 0 0 0 2px #0067ee',
      },
    }}
  />
)

export default Button
