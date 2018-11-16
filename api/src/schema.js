import { makeExecutableSchema } from 'graphql-tools'

import Eod from './schema/Eod.graphql'
import Team from './schema/Team.graphql'
import MutationResponse from './schema/MutationResponse.graphql'
import schema from './schema.graphql'

import EodResolvers from './resolvers/Eod'
import TeamResolvers from './resolvers/Team'

const executableSchema = makeExecutableSchema({
  typeDefs: [schema, Eod, Team, MutationResponse],
  resolvers: [EodResolvers, TeamResolvers],
})

export default executableSchema
