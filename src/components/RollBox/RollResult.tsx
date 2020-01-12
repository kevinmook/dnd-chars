import React from 'react';
import {RollResultWithTotals} from './types';

type RollResultProps = {
  rollResult: RollResultWithTotals;
};

const RollResult: React.FC<RollResultProps> = ({rollResult}) => {

  return (
    <div>
      <div>
        <h3>Basic hit rolls</h3>
        <ul>
          {rollResult.attackRolls.map((roll, index) => (
            <li key={index}>{roll.diceResult} / {roll.diceSize}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Bonus hit rolls</h3>
        <ul>
          {rollResult.attackBonusRolls.map((roll, index) => (
            <li key={index}>{roll.diceResult} / {roll.diceSize}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Plus to hit</h3>
        <ul>
          <li>{rollResult.plusToHit}</li>
        </ul>
      </div>
      <div>
        <h3>Damage rolls</h3>
        <ul>
          {rollResult.damageRolls.map((roll, index) => (
            <li key={index}>{roll.diceResult} / {roll.diceSize}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Final to hit</h3>
        <ul>
          <li>{rollResult.finalToHit}</li>
        </ul>
      </div>
      <div>
        <h3>Final damage</h3>
        <ul>
          <li>{rollResult.finalDamage}</li>
        </ul>
      </div>
    </div>
  );
};

export default RollResult;
