import { userRepos } from './user.repos.js'
import { sessionRepos } from '../session/session.repos.js'
import bcrypt from 'bcrypt'

const DEFAULT_BUDGET = 100;

export const userServices = {
    register: async (params) => {
        const hash = await bcrypt.hash(params.password, 10)

        const {password, ...paramsWithoutPassword} = params
        
        const user = await userRepos.create({
            ...paramsWithoutPassword,
            hash
        })

        if (user) {
            return await sessionRepos.create(params.email)
        } else {
            return false
        }
    },    
    login: async (params) => {
        const user = await userRepos.findByEmail(params.email)

        if (await bcrypt.compareSync(params.password, user.hash)) {
            return await sessionRepos.create(params.email)
        } else {
            return false
        }
    },
    me: async (sessionId) => {
        const session = await sessionRepos.findBySessionId(sessionId)

        if(session){
            const user = await userRepos.findByEmail(session.email)
            const {hash, ...userWithoutHash} = user
        
            return userWithoutHash
        } else {
            return false 
        }
    }
}
