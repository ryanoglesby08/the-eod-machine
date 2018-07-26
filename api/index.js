const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const mongoose = require('mongoose')
const app = express()

const schema = require('./schema')

const init = async () =>
  await mongoose.connect('mongodb://localhost/eodmachine') // TODO this needs to be parameterized to work with docker

init()

const entrySchema = new mongoose.Schema({
  category: String,
  content: String,
})

const Entry = mongoose.model('Entry', entrySchema)

app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }))
app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }))

app.get('/api/test', async (req, res) => {
  const entry = new Entry({
    category: 'Business as Usual',
    content: 'This is my update, it rocks',
  })
  const savedEntry = await entry.save()

  res.send(savedEntry)
})

const PORT = 4000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
