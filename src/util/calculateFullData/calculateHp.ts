import {CharacterData, FullCharacterData, Dice} from '../../types';
import getHitDiceForClass from './getHitDiceForClass';
import getMaxHitDieValue from './getMaxHitDieValue';

const calculateHp = (startingClass: CharacterData['startingClass'], hitDice: Dice, statModifiers: FullCharacterData['statModifiers']): number => {
  const startingClassFirstHitDie = getHitDiceForClass(startingClass);
  let hp = getMaxHitDieValue(startingClassFirstHitDie) / 2 - 1; // we'll add back the rest of the die when iterating over the hit dice
  const constMod = statModifiers.constitution

  Object.entries(hitDice).forEach(([dice, level]) => {
    if (level && level > 0) {
      const amountPerLevel = getMaxHitDieValue(dice as keyof Dice) / 2 + 1;
      hp += level * (amountPerLevel + constMod);
    }
  });

  return hp;
};

export default calculateHp;
