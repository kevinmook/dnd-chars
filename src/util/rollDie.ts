import {Random} from 'random-js';
import {DiceRoll} from '../types';

const random = new Random();

const rollDie = (diceSize: number): DiceRoll => ({
  diceSize,
  diceResult: random.die(diceSize),
});

export default rollDie;
