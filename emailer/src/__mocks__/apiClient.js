const stubs = {}

const __stubQuery = (query, responseData) => {
  stubs[query] = responseData
}

const query = options => {
  const data = stubs[options.query]

  return Promise.resolve({
    data,
  })
}

export default { __stubQuery, query }
