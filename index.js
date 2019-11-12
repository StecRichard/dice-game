import Koa from "koa"
import Router from "koa-router"
import cors from "@koa/cors"
import bodyParser from "koa-bodyparser"

import { userRouter } from './user/user.routes.js'
import { gameRouter } from './game/game.routes.js'

const app = new Koa();
const router = new Router();

router.get("/", async function (ctx) {
  ctx.body = { message: "Hello World!" }
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(userRouter.routes())
  .use(gameRouter.routes())
  .use(router.allowedMethods())

app.listen(3000);



