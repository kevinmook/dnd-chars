import React from 'react';
import _ from 'lodash';
import {calculateDamage, calculateToHit, rollAttack} from '../../util/actions';
import {Action, FullCharacterData} from '../../types';
import {RollResultWithTotals} from './types';
import RollBoxLayout from './RollBoxLayout';

type RollBoxProps = {
  action: Action;
  character: FullCharacterData;
  defaultStates?: {
    guidance?: boolean,
    advantage?: boolean;
    sneakAttack?: boolean;
  };
  modifiers?: {
    elvenAccuracy?: boolean;
    rogueLevel?: number;
  };
  setClearCallback?: (callback: () => void) => void;
};

const RollBox: React.FC<RollBoxProps> = ({action, character, defaultStates, modifiers, setClearCallback}) => {
  const [guidance, setGuidance] = React.useState<boolean>(defaultStates?.guidance || false);
  const [advantage, setAdvantage] = React.useState<boolean>(defaultStates?.advantage || false);
  const [sneakAttack, setSneakAttack] = React.useState<boolean>(defaultStates?.sneakAttack || false);
  // const [offhand, setOffhand] = React.useState<boolean>(defaultStates?.sneakAttack || false);
  const [rollResult, setRollResult] = React.useState<RollResultWithTotals | null>(null);
  const toggleSneakAttack = () => setSneakAttack(!sneakAttack);
  const toggleAdvantage = () => setAdvantage(!advantage);
  const toggleGuidance = () => setGuidance(!guidance);

  setClearCallback?.(() => setRollResult(null));

  const baseDamage = calculateDamage({
    action,
    character,
    sneakAttack,
  });

  const plusToHit = calculateToHit(action, character);

  const roll = () => {
    const newRollResult = rollAttack({
      advantage,
      baseDamage,
      guidance,
      elvenAccuracy: modifiers?.elvenAccuracy,
    });

    const finalToHit = _.chain(
      [
        _.max(newRollResult.attackRolls.map(roll => roll.diceResult)),
        _.sum(newRollResult.attackBonusRolls.map(roll => roll.diceResult)),
        plusToHit,
      ]
    ).compact().sum().value();

    const finalDamage = _.chain(
      [
        _.sum(_.map(newRollResult.damageRolls, roll => roll.diceResult)),
        baseDamage.modifier,
      ]
    ).compact().sum().value();

    setRollResult({
      ...newRollResult,
      plusToHit,
      finalToHit,
      finalDamage,
    });
  };

  return (
    <RollBoxLayout
      advantage={advantage}
      damageDice={baseDamage}
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
