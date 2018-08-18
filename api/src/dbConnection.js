const { MongoClient } = require('mongodb')

let connection, db

const connectToDb = async (uri, dbName) => {
  connection = await MongoClient.connect(uri)
  db = await connection.db(dbName)
}

const closeDbConnection = async () => await connection.close()

const entriesCollection = () => db.collection('entries')
const teamsCollection = () => db.collection('teams')

module.exports = {
  connectToDb,
  closeDbConnection,
  entriesCollection,
  teamsCollection,
}
