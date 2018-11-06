const pick = require('./pick')

const defaultEntry = {
  author: 'Some author',
  category: 'Test category',
  content: 'some content',
}

const someEntryInput = (overrides = {}) => {
  return Object.assign(
    {},
    pick(defaultEntry, ['category', 'content']),
    pick(overrides, ['category', 'content'])
  )
}

const anAuthoredEntry = (overrides = {}) => {
  return Object.assign({}, defaultEntry, overrides)
}

const someEntryInputAndAuthoredEntry = (overrides = {}) => {
  return {
    entryInput: someEntryInput(overrides),
    authoredEntry: anAuthoredEntry(overrides),
  }
}

module.exports = {
  someEntryInput,
  anAuthoredEntry,
  someEntryInputAndAuthoredEntry,
}
