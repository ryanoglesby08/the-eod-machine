import groupBy from 'lodash/groupBy'

const NEW_LINE = '\r\n'
const BLANK_LINE = NEW_LINE + NEW_LINE
const CATEGORY_DIVIDER =
  '---------------------------------------------------------------------'

const header = () => `EOD Updates`

const entriesToString = entries =>
  entries.map(({ content }) => `* ${content}`).join(NEW_LINE)

const body = entries => {
  const entriesByCategory = groupBy(entries, 'category')

  return Object.keys(entriesByCategory)
    .map(category => {
      return CATEGORY_DIVIDER.concat(NEW_LINE)
        .concat(category)
        .concat(BLANK_LINE)
        .concat(entriesToString(entriesByCategory[category]))
    })
    .join(BLANK_LINE)
}

const footer = () => '- Delivered by The EOD Machine'

const textMessage = ({ currentEod }) => {
  return header()
    .concat(BLANK_LINE)
    .concat(body(currentEod))
    .concat(BLANK_LINE)
    .concat(NEW_LINE)
    .concat(footer())
}

export default textMessage
