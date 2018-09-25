class GraphQlMock {
  constructor(query) {
    this.query = query
  }

  withVariables = variables => {
    this.variables = variables
    return this
  }

  returns = resultData => {
    const variables = this.variables
    this.variables = undefined

    return {
      request: {
        query: this.query,
        variables: variables,
      },
      result: {
        data: resultData,
      },
    }
  }
}

const buildGraphQlMockForQuery = query => new GraphQlMock(query)

export default buildGraphQlMockForQuery
