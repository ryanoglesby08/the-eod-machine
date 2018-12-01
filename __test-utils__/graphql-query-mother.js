const parseFields = require('graphql-parse-fields')

const pick = require('./pick')

const createMother = (query, baseObject) => {
  const fields = extractFieldsFromGraphqlQuery(query)

  return (overrides = {}) => {
    return Object.assign({}, pick(baseObject, fields), pick(overrides, fields))
  }
}

const extractFieldsFromGraphqlQuery = queryAst => {
  const fieldAst = queryAst.definitions[0].selectionSet.selections[0]
  const queryName = fieldAst.name.value

  const fieldsOfQuery = parseFields(fieldAst)

  return Object.keys(fieldsOfQuery[queryName])
}

module.exports = createMother
