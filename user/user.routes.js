import Router from "koa-router"
import { userServices } from './user.services.js'
import { sessionRepos } from '../session/session.repos.js'

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.post('/register', async function (ctx) {
    const sessionId = await userServices.register(ctx.request.body)

    if (sessionId) {
        ctx.set('Set-Cookie', `sessionId=${sessionId}; Path=/`)
        ctx.response.status = 201
    } else {
        ctx.response.status = 500
    }
});

userRouter.post('/login', async function (ctx) {
    const sessionId = await userServices.login(ctx.request.body)

    if (sessionId) {
        ctx.set('Set-Cookie', `sessionId=${sessionId}; Path=/`)
        ctx.response.status = 204
    } else {
        ctx.response.status = 500
    }
});

userRouter.delete('/logout', async function (ctx) {
    const sessionId = ctx.cookies.get('sessionId')
    const deleteResult = await sessionRepos.delete(sessionId)

    if (deleteResult.deletedCount === 1) {
        ctx.response.status = 204
    } else {
        ctx.response.status = 500
    }
});

userRouter.get('/me', async function (ctx) {
    const sessionId = ctx.cookies.get('sessionId')
    const user = await userServices.me(sessionId)

    if (user) {
        ctx.response.status = 200
        ctx.response.body = { user }
    } else {
        ctx.response.status = 401
    }
});

// TODO: EDIT USER