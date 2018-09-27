import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
    
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
  
  html {
    font-size: 100%;
  }

  body {
    background-color: #fff;
    color: #000;
    
    margin: 0;
    padding: 0;
  }
`
