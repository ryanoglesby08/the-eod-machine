const MutationResponse = `
  type MutationResponse {
    success: Boolean!
  }
`

const buildMutationResponse = result => ({ success: result.ok === 1 })

module.exports = { schema: [MutationResponse], buildMutationResponse }
