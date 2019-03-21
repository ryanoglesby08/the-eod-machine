import { ButtonOutline } from 'rebass/emotion'
import styled from 'react-emotion'

export default styled(ButtonOutline)({
  '&:focus': {
    // Fix broken styling in rebass
    // boxShadow: '0 0 0 2px transparent',
    boxShadow: '0 0 0 2px #0067ee',
  },
})
