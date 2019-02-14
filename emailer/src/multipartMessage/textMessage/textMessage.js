import groupBy from 'lodash/groupBy'

import { toLongDate } from '../../time-utils/format'

const NEW_LINE = '\r\n'
const BLANK_LINE = NEW_LINE + NEW_LINE

const CATEGORY_DIVIDER =
  '---------------------------------------------------------------------'

const EMPTY_MESSAGE = 'No updates this time.'

const entriesToString = entries =>
  entries
    .map(({ author, content }) => `* ${content} (${author})`)
    .join(NEW_LINE)

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

const textMessage = (entries, eodLocation, eodLocationDate) => `
EOD updates from ${eodLocation.name} for ${toLongDate(eodLocationDate)}

${entries.length === 0 ? EMPTY_MESSAGE : body(entries)}


- Delivered by The EOD Machine
`

export default textMessage
