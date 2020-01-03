import {Dice} from '../types';

const addDice = (dice1: Dice, dice2: Dice): Dice => {
  const newDice: Dice = {
    d4: (dice1.d4 || 0) + (dice2.d4 || 0),
    d6: (dice1.d6 || 0) + (dice2.d6 || 0),
    d8: (dice1.d8 || 0) + (dice2.d8 || 0),
    d10: (dice1.d10 || 0) + (dice2.d10 || 0),
    d12: (dice1.d12 || 0) + (dice2.d12 || 0),
    d20: (dice1.d20 || 0) + (dice2.d20 || 0),
    modifier: (dice1.modifier || 0) + (dice2.modifier || 0),
  }

  const newDiceKeys = Object.keys(newDice) as (keyof Dice)[];
  newDiceKeys.forEach((key) => {
    if(newDice[key] === 0) {
      delete newDice[key];
    }
  })

  return newDice;
};

export default addDice;
