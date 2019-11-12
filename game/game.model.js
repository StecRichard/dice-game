import { gameActions } from "./game.actions.js";

export const DEFAULT_RULES = {
  MINIMUM_PLAYERS: 2,
  MAXIMUM_PLAYERS: 6,
  DICE_SIDES: 6,
  MINIMUM_BET: 5,
  MINIMUM_CREDIT_FOR_ENTER: 100,
  CHANCE_TO_DICE_FALL: 0.05
};

export const PHASES = {
  INITIAL_THROW: "initialThrow",
  SECOND_THROW: "secondThrow",
  PLACING_BET: "placingBet",
  SELECTING_DICE: "selectingDice",
  // 
  FINAL_THROW: "finalThrow"
};

export const GAME_PHASES_ACTIONS = {
  // ASK: shouldnt it be like this: [INITIAL_THROW]: gameActions.throw  ? I have it like this in EVALUATION_ACTIONS
  INITIAL_THROW: gameActions.throw,
  SECOND_THROW: gameActions.throw,
  PLACING_BET: gameActions.placingBet,
  SELECTING_DICE: gameActions.selectingDice,
  FINAL_THROW: gameActions.finalThrow
};

export const RESULTS = {
  JACKPOT: "jackpot",
  THROW_AGAIN: "throwAgain",
  NEXT_PLAYER: "nextPlayer",
  SELECT_DICE: "selectDice",
  FALLEN_DICE: "fallenDice",
  WIN: "win",
  LOSS: "loss"
};
// TODO: after evaluation when bank is 0, all users have to put MINIMUMBET to bank

const BEGINNING_STATE = {
  bank: 0,
  phase: PHASES.INITIAL_THROW,
  result: null,
  currentBet: null,
  currentPlayer: null,
  dice: {
    threeInicialDice: [null, null, null],
    twoRestDice: [null, null],
    oneFinalDice: null
  }
};

const generateKey = () => {
  return [...Array(50)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join("");
};

export class Game {
  constructor(
    name = "DefaultNameOfGame",
    state = BEGINNING_STATE,
    rules = DEFAULT_RULES,
    key = generateKey(),
    connectedPlayers = []
  ) {
    this.name = name;
    this.state = state;
    this.rules = rules;
    this.key = key;
    this.connectedPlayers = connectedPlayers;
  }
}
