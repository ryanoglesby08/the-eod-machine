const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const schema = require('./schema')

const PORT = 4000

const app = express()

app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' })) // if you want GraphiQL enabled

app.listen(PORT)
