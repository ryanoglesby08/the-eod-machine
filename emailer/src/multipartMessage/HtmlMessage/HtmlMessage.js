import React from 'react'

import groupBy from 'lodash/groupBy'

const Entries = ({ entries }) => {
  if (entries.length === 0) {
    return <div>No updates this time.</div>
  }

  const entriesByCategory = groupBy(entries, 'category')

  return (
    <>
      {Object.keys(entriesByCategory).map(category => (
        <div key={category}>
          <h2>{category}</h2>

          <ul>
            {entriesByCategory[category].map(({ author, content }) => (
              <li key={content}>{`${content} (${author})`}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

const HtmlMessage = ({ entries }) => (
  <>
    <h1>EOD Updates</h1>

    <Entries entries={entries} />

    <div>Delivered by The EOD Machine</div>
  </>
)

export default HtmlMessage
