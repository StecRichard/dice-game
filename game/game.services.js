import { GAME_PHASES_ACTIONS } from './game.model.js'
import { gameRepos } from './game.repos.js'
import { userRepos } from '..user/user.repos.js'
import { userServices } from '../user/user.services.js'


export const gameService = {
  index: async () => {
    return await gameRepos.index()
  },
  create: async (params) => {
    return await gameRepos.create(params.name)
  },
  play: async (params, currentUser) => {
    const game = await gameRepos.findByUserId(currentUser.Id)
    const { game: changedGame, user: changedUser } = GAME_PHASES_ACTIONS[game.state.phase](game, params, currentUser)
    const gameSaving = await gameRepos.save(changedGame)
    const userSaving = changedUser ? await userRepos.save(changedUser) : null ;

    if (gameSaving.result.ok && userSaving && userSaving.result.ok ) {
      return changedGame
    } 
  },
  connect: async (params, sessionId) => {
    let game = await gameRepos.findByKey(params.key)
    const currentUser = await userServices.me(sessionId)

    if (game && currentUser) {
      game.connectedPlayers.push(currentUser.id)
      const gameSaving = await gameRepos.save(game)

      if (gameSaving.result.ok === 1) {
        return game
      } else {
        return null
      }
    } else {
      return null
    }
  },
  disconnect: async (params, sessionId) => {
    let game = await gameRepos.findByKey(params.key)
    const currentUser = await userServices.me(sessionId)

    if (game && currentUser) {
      game.connectedPlayers = game.connectedPlayers.filter((i) => { i != currentUser.id })
      const gameSaving = await gameRepos.save(game)

      if (gameSaving.result.ok === 1) {
        return game
      } else {
        return null
      }
    } else {
      return null
    }
  }
}
