import React from 'react'
import { ButtonOutline as RebassButtonOutline } from 'rebass/emotion'

const ButtonOutline = props => (
  <RebassButtonOutline
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

export default ButtonOutline
