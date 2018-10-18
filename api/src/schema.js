const { makeExecutableSchema } = require('graphql-tools')

const Eod = require('./schema/Eod')
const Team = require('./schema/Team')
const MutationResponse = require('./schema/MutationResponse')

const SchemaDefinition = `
  type Query { 
    eod(teamId: String!): Eod
    
    team(id: String!): Team
    teams: [Team]
  }
  
  type Mutation {
    addToEod(entries: [EntryInput]!, teamId: String!): [Entry]
    sendEod: MutationResponse
    
    createTeam(team: TeamInput!): Team
    editTeam(id: String!, team: TeamInput!): Team
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition]
    .concat(Eod.schema)
    .concat(Team.schema)
    .concat(MutationResponse.schema),
  resolvers: [].concat(Eod.resolvers).concat(Team.resolvers),
})
