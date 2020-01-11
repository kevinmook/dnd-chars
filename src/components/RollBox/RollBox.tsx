import React from 'react';
import _ from 'lodash';
import {addDice} from '../../util';
import {sneakAttackDamage} from '../../util/actions';
import {Dice, Action} from '../../types';
import {RollResultType, rollDie} from './RollResult';
import RollBoxLayout from './RollBoxLayout';

type RollBoxProps = {
  action: Action;
  defaultStates?: {
    guidance?: boolean,
    advantage?: boolean;
    sneakAttack?: boolean;
  };
  modifiers?: {
    elvenAccuracy?: boolean;
    rogueLevel?: number;
  };
  baseRoll: Dice;
  baseToHit: number;
  setClearCallback?: (callback: () => void) => void;
};

const RollBox: React.FC<RollBoxProps> = ({baseToHit, defaultStates, baseRoll, modifiers, setClearCallback}) => {
  const [guidance, setGuidance] = React.useState<boolean>(defaultStates?.guidance || false);
  const [advantage, setAdvantage] = React.useState<boolean>(defaultStates?.advantage || false);
  const [sneakAttack, setSneakAttack] = React.useState<boolean>(defaultStates?.sneakAttack || false);
  const [offhand, setOffhand] = React.useState<boolean>(defaultStates?.sneakAttack || false);
  const [rollResult, setRollResult] = React.useState<RollResultType | null>(null);
  const toggleSneakAttack = () => setSneakAttack(!sneakAttack);
  const toggleAdvantage = () => setAdvantage(!advantage);
  const toggleGuidance = () => setGuidance(!guidance);

  setClearCallback?.(() => setRollResult(null));

  let damageDice: Dice = baseRoll;
  if (sneakAttack) {
    damageDice = addDice(damageDice, sneakAttackDamage(modifiers?.rogueLevel))
  }

  const roll = () => {
    const newRollResult: RollResultType = {
      basicHitRolls: [],
      bonusHitRolls: [],
      plusToHit: baseToHit,
      damageRolls: [],
      finalToHit: 0,
      finalDamage: 0,
    };

    newRollResult.basicHitRolls.push(rollDie(20));
    if (advantage) {
      newRollResult.basicHitRolls.push(rollDie(20));
      if (modifiers?.elvenAccuracy) {
        newRollResult.basicHitRolls.push(rollDie(20));
      }
    }
    if (guidance) {
      newRollResult.bonusHitRolls.push(rollDie(4));
    }
    const crit = _.some(newRollResult.basicHitRolls, roll => roll.diceResult === 20);

    Object.entries(damageDice).forEach(([diceSizeStr, diceCount]) => {
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
          newRollResult.damageRolls.push(rollDie(diceSize));
        }
      }
    });

    newRollResult.finalToHit = _.chain(
      [
        _.max(newRollResult.basicHitRolls.map(roll => roll.diceResult)),
        _.sum(newRollResult.bonusHitRolls.map(roll => roll.diceResult)),
        newRollResult.plusToHit,
      ]
    ).compact().sum().value();

    newRollResult.finalDamage = _.chain(
      [
        _.sum(_.map(newRollResult.damageRolls, roll => roll.diceResult)),
        damageDice.modifier,
      ]
    ).compact().sum().value();

    setRollResult(newRollResult);
  };

  return (
    <RollBoxLayout
      advantage={advantage}
      damageDice={damageDice}
      guidance={guidance}
      roll={roll}
      rollResult={rollResult}
      sneakAttack={sneakAttack}
      toggleAdvantage={toggleAdvantage}
      toggleGuidance={toggleGuidance}
      toggleSneakAttack={toggleSneakAttack}
    />
  );
};

export default RollBox;
