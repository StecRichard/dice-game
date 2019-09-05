import MongoDriver from "mongodb";

const url = 'mongodb://localhost:27017';
const dbName = 'test_app';
let db;

export const getDb = async() => {
  if (!db) {
    let client = new MongoDriver.MongoClient(url);
    const connection = await client.connect()
    db = connection.db(dbName)
  }
  return db;
}