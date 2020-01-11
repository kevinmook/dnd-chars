import React from 'react';
import {Random} from 'random-js';

const random = new Random();

type RollResultProps = {
  rollResult: RollResultType;
};

export type DiceRoll = {
  diceSize: number;
  diceResult: number;
};

export type RollResultType = {
  basicHitRolls: DiceRoll[];
  bonusHitRolls: DiceRoll[];
  plusToHit: number;
  damageRolls: DiceRoll[];
  finalToHit: number;
  finalDamage: number;
};

const RollResult: React.FC<RollResultProps> = ({rollResult}) => {

  return (
    <div>
      <div>
        <h3>Basic hit rolls</h3>
        <ul>
          {rollResult.basicHitRolls.map((roll, index) => (
            <li key={index}>{roll.diceResult} / {roll.diceSize}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Bonus hit rolls</h3>
        <ul>
          {rollResult.bonusHitRolls.map((roll, index) => (
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

export const rollDie = (diceSize: number): DiceRoll => ({
  diceSize,
  diceResult: random.die(diceSize),
});

export default RollResult;
