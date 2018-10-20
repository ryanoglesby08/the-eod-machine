import { MongoClient } from 'mongodb'

let connection, db

export const connectToDb = async (uri, dbName) => {
  connection = await MongoClient.connect(uri)
  db = await connection.db(dbName)
}

export const closeDbConnection = async () => await connection.close()

export const entriesCollection = () => db.collection('entries')
export const teamsCollection = () => db.collection('teams')
