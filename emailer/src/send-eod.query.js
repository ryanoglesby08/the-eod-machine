import gql from 'graphql-tag'

// TODO: use me!

const SEND_EOD = gql`
  mutation SendEod {
    sendEod {
      success
    }
  }
`

export default SEND_EOD
