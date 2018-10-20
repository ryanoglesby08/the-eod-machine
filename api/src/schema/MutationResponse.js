const MutationResponse = `
  type MutationResponse {
    success: Boolean!
  }
`

export const buildMutationResponse = result => ({ success: result.ok === 1 })

const mutationSchema = { schema: [MutationResponse] }
export default mutationSchema
