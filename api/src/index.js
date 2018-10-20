import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'

import schema from './schema'
import { connectToDb } from './dbConnection'

const app = express()

const DB_HOST = process.env.DB_HOST || 'localhost'
const PORT = 4000

const run = async () => {
  await connectToDb(`mongodb://${DB_HOST}`, 'eodmachine')

  app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
  app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }))

  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
}

run()
