import { getDb } from '../db.js'
import { User } from './user.model.js';

export const userRepos = new class {
  create = async (user) => {
    const connection = await getDb()
    const collection = connection.collection('users')
    const newUser = new User(...user)

    const insertResult = await collection.insertOne(newUser);

    return parseUser(insertResult.ops[0])
  };

  findByEmail = async (email) => {
    const connection = await getDb()
    const collection = connection.collection('users')

    return parseUser(await collection.findOne({ email }))
  }

  findByUsername = async (username) => {
    const connection = await getDb()
    const collection = connection.collection('users')

    return parseUser(await collection.findOne({ username }))
  }

  save = async (user) => {
    const connection = await getDb()
    const collection = connection.collection('users')
    
    return await collection.updateOne({ id: user.id }, { $set: user })
  }
}

const parseUser = (user) => {
  const { _id, ...rest } = user

  return {
    ...rest,
    id: _id
  }
}