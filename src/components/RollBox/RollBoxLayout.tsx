import React from 'react';
import {styled} from 'linaria/react';
import {Dice} from '../../types';
import {RollResultWithTotals} from './types';
import DiceBlock from '../DiceBlock';
import RollResult from './RollResult';

type RollBoxLayoutProps = {
  advantage: boolean;
  damageDice: Dice;
  guidance: boolean;
  roll: () => void;
  rollResult: RollResultWithTotals | null;
  sneakAttack: boolean;
  toggleAdvantage: () => void;
  toggleGuidance: () => void;
  toggleSneakAttack: () => void;
};

const RollBoxContainer = styled.div`
  > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const RollModifiers = styled.div`
  user-select: none;
  display: flex;
  max-width: 400px;
  justify-content: space-between;
`;

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
    <RollBoxContainer>
      <RollModifiers>
        <label>
          <input name="advantage" type="checkbox" checked={advantage} onChange={toggleAdvantage} /> Advantage
        </label>
        <label>
          <input name="guidance" type="checkbox" checked={guidance} onChange={toggleGuidance} /> Guidance
        </label>
        <label>
          <input name="sneakAttack" type="checkbox" checked={sneakAttack} onChange={toggleSneakAttack} /> Sneak Attack
        </label>
      </RollModifiers>

      <div>Attack for <DiceBlock dice={damageDice} /></div>
      <button onClick={roll}>Roll</button>

      {rollResult && <RollResult rollResult={rollResult} damageDice={damageDice} />}

    </RollBoxContainer>
  );
};

export default RollBoxLayout;
