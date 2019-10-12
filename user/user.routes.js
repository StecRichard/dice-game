import Router from "koa-router"
import { userServices } from './user.services.js'
import { sessionRepos } from '../session/session.repos.js'

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.post('/register', async function (ctx) {
    const sessionId = await userServices.register(ctx.request.body) 

    if(sessionId){
        ctx.set('Set-Cookie', `sessionId=${sessionId}; Path=/`)   
    } else {
        ctx.response.status = 500
    }
});

userRouter.post('/login', async function (ctx) {
    const sessionId = await userServices.login(ctx.request.body)

    if(sessionId){
        ctx.set('Set-Cookie', `sessionId=${sessionId}; Path=/`)   
    } else {
        ctx.response.status = 500
    }
});

userRouter.delete('/logout', async function (ctx) {
    const sessionId = ctx.cookies.get('sessionId')
    await sessionRepos.delete(sessionId)
});

userRouter.get('/me', async function (ctx) {
    const sessionId = ctx.cookies.get('sessionId')
    const user = await userServices.me(sessionId)

    if(user){
        ctx.response.body = { user }
    } else {
        ctx.response.status = 401
    }    
});