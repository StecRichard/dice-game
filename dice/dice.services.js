import axios from "axios";
import { PHASES, RESULTS, DEFAULT_RULES } from "../game/game.model.js";

export const diceService = {
  throwDice: async (count = 3) => {
    if (fallenDice()) {
      return null;
    }

    try {
      const response = await axios.get(
        `https://www.random.org/integers/?num=${count}&min=1&max=6&col=1&base=10&format=plain&rnd=new`
      );

      if (Number.isInteger(response.data)) {
        return [response.data];
      } else {
        return response.data
          .split("\n")
          .filter(m => m)
          .map(m => parseInt(m));
      }
    } catch (error) {
      console.error(error);
    }
  },
  checkDice: (diceNumbers, phase) => {
    if (rules.sameNumbers(diceNumbers)) {
      return RESULTS.JACKPOT;
    } else if (rules.consecutiveNumbers(diceNumbers)) {
      if (phase === PHASES.INITIAL_THROW) {
        return RESULTS.THROW_AGAIN;
      } else if (phase === PHASES.SECOND_THROW) {
        return RESULTS.JACKPOT;
      }
    } else if (rules.wrongNumbers(diceNumbers)) {
      return RESULTS.NEXT_PLAYER;
    } else {
      return RESULTS.SELECT_DICE;
    }
  },
  finalThrow: async () => {
    const number = await throwDice(1);

    if (!number) {
      return RESULTS.FALLEN_DICE;
    } else {
      // set(game, ['state', 'dice', 'oneFinalDice'], number)
      // ASK: can I just change game object if I am not returning him?
    }

    return rules.numberIsMiddle(game.state.twoRestDice, number)
      ? RESULTS.WIN
      : RESULTS.LOSS;
  },
  selectDice: (game, selectedNumber) => {
    
    const changedGameState = {
      ...game.state,
      dice: {
        threeInicialDice: [null, null, null],
        twoRestDice: [null, null],
        oneFinalDice: selectedNumber
      }
    }

    return {
      ...game,
      state: changedGameState
    }
  }
};

const fallenDice = () => {
  //  5% chance to fall of dice
  return Math.random() < DEFAULT_RULES.CHANCE_TO_DICE_FALL;
};

const rules = new (class {
  sameNumbers = numbers => {
    return numbers.every(number => number === numbers[0]);
  };

  consecutiveNumbers = numbers => {
    numbers
      .sort((a, b) => a - b)
      .forEach((number, index) => {
        if (numbers[index + 1] - number !== 1) {
          return false;
        }
      });

    return true;
  };

  // numbers like 1,1,2 or 4,5,4
  wrongNumbers = numbers => {
    return Math.max(...numbers) - Math.min(...numbers) === 1;
  };

  numberIsMiddle = (numbers, number) => {
    Math.min(...numbers) < number && number < Math.max(...numbers);
  };
})();
