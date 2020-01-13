import {CharacterData, Dice} from '../../types';
import getHitDiceForClass from './getHitDiceForClass';

const calculateHitDice = (characterData: CharacterData): Dice => {
  const dice: Dice = {};

  Object.entries(characterData.classes).forEach(([charClassName, charClass]) => {
    const level = charClass?.level || 0;
    const diceType = getHitDiceForClass(charClassName as keyof CharacterData['classes']);
    dice[diceType] = (dice[diceType] || 0) + level;
  });

  return dice;
};

export default calculateHitDice;
