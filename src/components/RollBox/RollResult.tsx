import React from 'react';
import _ from 'lodash';
import {styled} from 'linaria/react';
import {RollResultWithTotals} from './types';
import {DiceRoll, Dice} from '../../types';

const RollResultContainer = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const RollBox = styled.div`
  > *:not(:first-child) {
    margin-top: 1rem;
  }

  > h3 {
    text-align: center;
    margin: 0;
  }

  border-color: #d3d3ff;
  border-width: 1px;
  border-style: solid;
  border-radius: 1rem;
  padding: 2rem;
  min-width: 10rem;
`;

const DiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const DamageDiceResult = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    text-align: center;
  }
`;

const BigResults = styled.div<{crit?: boolean; critMiss?: boolean;}>`
  font-size: 4rem;
  text-align: center;
  color: ${props => {
    if (props.crit) {
      return 'green';
    } else if (props.critMiss) {
      return 'red';
    } else {
      return '';
    }
  }};
`;

type RollResultProps = {
  rollResult: RollResultWithTotals;
  damageDice: Dice;
};

const sortDiceRolls = (diceResult1: DiceRoll, diceResult2: DiceRoll): number => {
  if (diceResult1.diceSize > diceResult2.diceSize) {
    return -1;
  } else if (diceResult1.diceSize < diceResult2.diceSize) {
    return 1
  } else if (diceResult1.diceResult > diceResult2.diceResult) {
    return -1;
  } else if (diceResult1.diceResult < diceResult2.diceResult) {
    return 1;
  } else {
    return 0;
  }
};

const RollResult: React.FC<RollResultProps> = ({rollResult, damageDice}) => {
  const crit = _.some(rollResult.attackRolls, roll => roll.diceResult === 20);
  const critMiss = _.every(rollResult.attackRolls, roll => roll.diceResult === 1);

  return (
    <RollResultContainer>
      <RollBox>
        <h3>To Hit</h3>
        <DiceRow>
          {rollResult.attackRolls.sort(sortDiceRolls).map((roll, index) => (
            <DamageDiceResult key={`${index}-${roll.diceSize}-${roll.diceResult}`}>
              <div>+{roll.diceResult}</div>
              <div>(d{roll.diceSize})</div>
            </DamageDiceResult>
          ))}
        </DiceRow>
        {rollResult.attackBonusRolls.length > 0 && (
          <DiceRow>
            {rollResult.attackBonusRolls.map((roll, index) => (
              <div key={index}>+{roll.diceResult} (d{roll.diceSize})</div>
            ))}
          </DiceRow>
        )}
        <DiceRow>
          +{rollResult.plusToHit}
        </DiceRow>
        <BigResults crit={crit} critMiss={critMiss}>
          {rollResult.finalToHit}
        </BigResults>
      </RollBox>
      <RollBox>
        <h3>Damage</h3>
        <DiceRow>
          {rollResult.damageRolls.sort(sortDiceRolls).map((roll, index) => (
            <DamageDiceResult key={`${index}-${roll.diceSize}-${roll.diceResult}`}>
              <div>+{roll.diceResult}</div>
              <div>(d{roll.diceSize})</div>
            </DamageDiceResult>
          ))}
        </DiceRow>
        <DiceRow>
          +{damageDice.modifier}
        </DiceRow>
        <BigResults>
          {rollResult.finalDamage}
        </BigResults>
      </RollBox>
    </RollResultContainer>
  );
};

export default RollResult;
