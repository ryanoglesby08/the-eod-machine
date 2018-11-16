import { resolve as resolvePath } from 'path'
import { importSchema } from 'graphql-import'

const typeDefs = importSchema(resolvePath(__dirname, 'schema.graphql'))

export default typeDefs
