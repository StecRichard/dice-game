import { getDb } from '../db.js'

export const sessionRepos = {
    create: async (email) => {
        const connection = await getDb()
        const collection = connection.collection('sessions')
        const sessionId = [...Array(50)].map(i => (~~(Math.random() * 36)).toString(36)).join('')

        const insertStatus = (await collection.insertOne(
            {
                sessionId: sessionId,
                email
            }
        ));

        if (insertStatus.result.ok !== 0) {
            return sessionId
        } 
    },
    findBySessionId: async (sessionId) => {
        const connection = await getDb()
        const collection = connection.collection('sessions')

        return await collection.findOne({ sessionId })
    },
    delete: async (sessionId) => {
        const connection = await getDb()
        const collection = connection.collection('sessions')

        return await collection.deleteOne({ sessionId })
    }
}
