const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

const { connectToDb } = require('./dbConnection')
const schema = require('./schema')

const DB_HOST = process.env.DB_HOST || 'localhost'
connectToDb(`mongodb://${DB_HOST}`, 'eodmachine')

app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }))

const PORT = 4000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
