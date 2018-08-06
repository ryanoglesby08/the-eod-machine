const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const app = express()

const { connectToDb } = require('./dbConnection')
const schema = require('./schema')

connectToDb('mongodb://localhost', 'eodmachine')

app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }))

const PORT = 4000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
