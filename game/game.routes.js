import Router from "koa-router"
import { gameService } from './game.services.js'

export const gameRouter = new Router({
  prefix: '/game'
});

gameRouter.get('/index', async function (ctx) {
  const games = await gameService.index()

  if (games) {
    ctx.response.status = 200
    ctx.response.body = {
      games: games
    }
  } else {
    ctx.response.status = 500
  }

});

gameRouter.post('/new', async function (ctx) {
  const game = await gameService.create(ctx.request.body)

  if (game) {
    ctx.response.status = 201
    ctx.response.body = {
      game
    }
  } else {
    ctx.response.status = 500
  }

});

gameRouter.patch('/connect', async function (ctx) {
  const game = await gameService.connect(ctx.request.body, ctx.cookies.get('sessionId'))

  if (game) {
    ctx.response.status = 200
    ctx.response.body = {
      game
    }
  } else {
    ctx.response.status = 500
  }

});

gameRouter.patch('/disconnect', async function (ctx) {
  const game = await gameService.disconnect(ctx.request.body, ctx.cookies.get('sessionId'))
  if (game) {
    ctx.response.status = 204
  } else {
    ctx.response.status = 500
  }

});

gameRouter.patch('/play', async function (ctx) {
  const user = await userServices.me(ctx.cookies.get('sessionId'))
  const game = await gameService.play(ctx.request.body, user)

  if (game) {
    ctx.response.status = 200
    ctx.response.body = {
      game
    }
  } else {
    ctx.response.status = 500
  }
});
