import React, { Fragment } from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import groupBy from 'lodash/groupBy'

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
      const entriesByCategory = groupBy(savedEntries, 'category')

      return (
        <Fragment>
          {Object.keys(entriesByCategory).map(category => (
            <Fragment key={category}>
              <h2>{category}</h2>

              <ul>
                {entriesByCategory[category].map(({ content }) => (
                  <li key={content}>{content}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </Fragment>
      )
    }}
  </Query>
)

export default EodEmail
