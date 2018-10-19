import React, { Fragment } from 'react'

import groupBy from 'lodash/groupBy'

const HtmlMessage = ({ entries }) => {
  const entriesByCategory = groupBy(entries, 'category')

  return (
    <Fragment>
      <h1>EOD Updates</h1>

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

      <div>Delivered by The EOD Machine</div>
    </Fragment>
  )
}

export default HtmlMessage
