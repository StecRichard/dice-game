import { getDb } from '../db.js'
import { Game } from './game.model.js'

export const gameRepos = {
    index: async () => {
        const connection = await getDb()
        const collection = connection.collection('games')

        return await collection.find()
    },
    create: async (gameName) => {
        const connection = await getDb()
        const collection = connection.collection('games')
        const game = new Game(gameName)

        await collection.insertOne(game)

        return game
    },
    findByKey: async (key) => {
        const connection = await getDb()
        const collection = connection.collection('games')

        return await collection.findOne({ key: key })
    },
    findByUserId: async (userId) => {
        const connection = await getDb()
        const collection = connection.collection('games')

        return await collection.findOne({ connectedPlayers:  { $eq: userId }  })
    },
    save: async (game) => {
        const connection = await getDb()
        const collection = connection.collection('games')
        
        return await collection.updateOne({ key: game.key }, { $set: game })
    }
}
