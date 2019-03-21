import React from 'react'
import { Button as RebassButton } from 'rebass/emotion'

const Button = props => (
  <RebassButton
    {...props}
    border={'1px dashed'}
    bg="white"
    color="black"
    css={{
      '&:focus': {
        // Fix broken styling in rebass
        outline: ['1px dotted #212121', '5px auto -webkit-focus-ring-color'],
      },
    }}
  />
)

export default Button
