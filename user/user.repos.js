import { getDb } from '../db.js'

export const userRepos = new class {

  create = async (user) => {
    const connection = await getDb()
    const collection = connection.collection('users')

    const insertResult = await collection.insertOne(user);

    const {_id, ...rest} = insertResult.ops[0]
    
    return {
      ...rest,
      id: _id
    }
  };

  findByEmail = async (email) => {
    const connection = await getDb()
    const collection = connection.collection('users')

    return await collection.findOne({ email })
  }
}
