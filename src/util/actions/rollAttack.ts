import _ from 'lodash';
import {DiceRoll, RollResultType, Dice} from '../../types';
import rollDie from '../rollDie';

type RollAttack = (args: {
  advantage?: boolean;
  baseDamage: Dice;
  elvenAccuracy?: boolean;
  guidance?: boolean,
}) => RollResultType;

const rollAttack: RollAttack = ({
  advantage,
  baseDamage,
  guidance,
  elvenAccuracy,
}) => {

  const attackRolls = [
    rollDie(20)
  ];
  const attackBonusRolls: DiceRoll[] = [];
  const damageRolls: DiceRoll[] = [];

  if (advantage) {
    attackRolls.push(rollDie(20));
    if (elvenAccuracy) {
      attackRolls.push(rollDie(20));
    }
  }
  if (guidance) {
    attackBonusRolls.push(rollDie(4));
  }
  const crit = _.some(attackRolls, roll => roll.diceResult === 20);

  Object.entries(baseDamage).forEach(([diceSizeStr, diceCount]) => {
    let diceSize: undefined | number = undefined;
    switch (diceSizeStr as keyof Dice) {
      case 'd4': diceSize = 4; break;
      case 'd6': diceSize = 6; break;
      case 'd8': diceSize = 8; break;
      case 'd10': diceSize = 10; break;
      case 'd12': diceSize = 12; break;
      case 'd20': diceSize = 20; break;
    }

    if (diceSize && diceCount) {
      const critModifier = crit ? 2 : 1;
      const numRolls = diceCount * critModifier;

      for (let i = 0; i < numRolls; i++) {
        damageRolls.push(rollDie(diceSize));
      }
    }
  });

  return {
    attackRolls,
    attackBonusRolls,
    damageRolls,
  };
};

export default rollAttack;
