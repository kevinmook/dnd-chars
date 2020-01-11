import React from 'react';
import {Dice} from '../../types';
import DiceBlock from '../DiceBlock';
import RollResult, {RollResultType} from './RollResult';

type RollBoxLayoutProps = {
  advantage: boolean;
  damageDice: Dice;
  guidance: boolean;
  roll: () => void;
  rollResult: RollResultType | undefined;
  sneakAttack: boolean;
  toggleAdvantage: () => void;
  toggleGuidance: () => void;
  toggleSneakAttack: () => void;
};

const RollBoxLayout: React.FC<RollBoxLayoutProps> = ({
  advantage,
  damageDice,
  guidance,
  roll,
  rollResult,
  sneakAttack,
  toggleAdvantage,
  toggleGuidance,
  toggleSneakAttack,
}) => {
  return (
    <div>
      <div>Advantage: {advantage ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleAdvantage}>Toggle advantage</button>
      </div>

      <div>Guidance: {guidance ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleGuidance}>Toggle guidance</button>
      </div>

      <div>Sneak attack: {sneakAttack ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleSneakAttack}>Toggle sneak attack</button>
      </div>

      <div>Attack for <DiceBlock dice={damageDice} /></div>

      {rollResult && <RollResult rollResult={rollResult} />}

      <button onClick={roll}>Roll</button>
    </div>
  );
};

export default RollBoxLayout;
