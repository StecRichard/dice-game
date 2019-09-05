import Router from "koa-router"
import { throwDices } from './dice.services.js'

export const diceRouter = new Router({
    prefix: '/dices'
});

diceRouter.get('/', async function (ctx) {
    const numbers = await throwDices(ctx.query.count)
    ctx.body = numbers
});
