const { MongoClient } = require('mongodb')

let connection, db

const connectToDb = async (uri, dbName) => {
  connection = await MongoClient.connect(uri)
  db = await connection.db(dbName)
}

const closeDbConnection = async () => await connection.close()

const entries = () => db.collection('entries')

module.exports = { connectToDb, closeDbConnection, entries }
