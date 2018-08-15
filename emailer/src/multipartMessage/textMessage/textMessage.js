import groupBy from 'lodash/groupBy'

const blankLine = '\r\n'

const entriesToString = entries =>
  entries.map(({ content }) => `* ${content}`).join(blankLine)

const textMessage = ({ entries }) => {
  const entriesByCategory = groupBy(entries, 'category')

  return Object.keys(entriesByCategory)
    .map(category => {
      return category + blankLine + entriesToString(entriesByCategory[category])
    })
    .join(blankLine + blankLine)
}

export default textMessage
