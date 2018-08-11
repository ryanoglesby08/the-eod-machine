import React from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const GET_EOD = gql`
  {
    eod {
      entries {
        category
        content
      }
    }
  }
`

const EodEmail = () => (
  <Query query={GET_EOD}>
    {({ data: { eod } }) => {
      const savedEntries = eod ? eod.entries : []

      return (
        <div>
          {savedEntries.map(({ category, content }) => (
            <div key={content}>
              {category}: {content}
            </div>
          ))}
        </div>
      )
    }}
  </Query>
)

export default EodEmail
