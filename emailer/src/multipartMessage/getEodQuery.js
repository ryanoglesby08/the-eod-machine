import gql from 'graphql-tag'

export default gql`
  {
    eod {
      entries {
        category
        content
      }
    }
  }
`
