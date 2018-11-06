import { makeExecutableSchema } from 'graphql-tools'

import Eod from './schema/Eod'
import Team from './schema/Team'
import MutationResponse from './schema/MutationResponse'

const SchemaDefinition = `
  type Query { 
    eod(teamId: String!): Eod
    
    team(id: String!): Team
    teams: [Team]
  }
  
  type Mutation {
    addToEod(author: String!, entries: [EntryInput]!, teamId: String!): [Entry]
    sendEod: MutationResponse
    
    createTeam(team: TeamInput!): Team
    editTeam(id: String!, team: TeamInput!): Team
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    ...Eod.schema,
    ...Team.schema,
    ...MutationResponse.schema,
  ],
  resolvers: [Eod.resolvers, Team.resolvers],
})

export default schema
