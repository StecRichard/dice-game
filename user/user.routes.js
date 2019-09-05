import Router from "koa-router"
import { findAll } from './user.repos.js'
import { insertMany } from './user.repos.js'
import { insert } from './user.repos.js'

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.post('/', async function (ctx) {
    insertMany()
});

userRouter.post('/new', async function (ctx) {
    insert()
});

userRouter.get('/', async function (ctx) {
    users = await findAll()
    ctx.body = { message: users }
});
