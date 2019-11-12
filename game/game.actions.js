import { PHASES, RESULTS } from "./game.model.js";
import { diceService } from "../dice/dice.services.js";
import { set } from "lodash-es";

export const gameActions = {
  throw: async (game, _, user) => {
    const numbers = await diceService.throwDice();
    const changedResult = numbers
      ? diceService.checkDice(numbers, game.state.phase)
      : RESULTS.FALLEN_DICE;

    const changedGameState = {
      ...game.state,
      result: changedResult
    };

    const evaluationResult = evaluation(changedGameState, user.credit);

    return {
      game: {
        ...game,
        state: evaluationResult.gameState
      },
      user: {
        ...user,
        credit: evaluationResult.credit
      }
    };
  },
  finalThrow: async (game, _, user) => {
    const gameStateResult = await diceService.finalThrow();

    const changedGameState = {
      ...game.state,
      result: gameStateResult
    };

    const evaluationResult = evaluation(changedGameState, user.credit);

    return {
      game: set(game, ['state'], evaluationResult.gameState),
      user: set(user, ['credit'], evaluationResult.credit)
    };
  },
  selectingDice: (game, params) => {
    return params.selectedNumber
      ? {
          game: set(diceService.selectDice(game, params.selectedNumber), ['state', 'phase'], PHASES.FINAL_THROW)
        }  
      : null;

      // TODO: exec finalThrow right after selectingDice 
  },
  placingBet: (game, params, user) => {
    // ASK: is this return ok?
    return {
      game: set(game, ['state', 'currentBet'], params.bet),
      user: set(user, ['credit'], user.credit - params.bet)
    };
  }
};

const evaluation = (gameState, credit) => {
  const evaluationActionResult = EVALUATION_ACTIONS[gameState.result](gameState, credit)

  // if(evaluationActionResult.bank === 0){
  //   changedBank = everyPlayerBet(gameState)
  //   // TODO: 
  //   // better do it in own phase emptyBank -> everyPlayerBet
  // }

  return {
    gameState: {
      ...gameState,
      bank: evaluationActionResult.bank,
      currentBet: 0
    },
    credit: evaluationActionResult.credit
  };
};

const EVALUATION_ACTIONS = {
  [RESULTS.WIN]: evaluationWin,
  [RESULTS.LOSS]: evaluationLoss,
  [RESULTS.JACKPOT]: evaluationJackpot
}

const evaluationWin = (gameState, credit) => {
  if (gameState.bank > gameState.currentBet) {
    return {
      bank: gameState.bank - gameState.currentBet,
      credit: credit + gameState.currentBet
    }
  } else {
    return {
      bank: 0,
      credit: credit + gameState.bank
    }
  }
}

const evaluationLoss = (gameState, credit) => {
  return {
    bank: gameState.bank + gameState.currentBet,
    credit: credit - gameState.currentBet
  }
}

const evaluationJackpot = (gameState, credit) => {
  return {
    bank: 0,
    credit: credit + gameState.bank
  }
}

const everyPlayerBet = (gameState) => {
// TODO:
}