const defaultEntry = {
  category: 'Test category',
  content: 'some content',
}

const anEntry = (overrides = {}) => {
  return Object.assign({}, defaultEntry, overrides)
}

module.exports = anEntry
