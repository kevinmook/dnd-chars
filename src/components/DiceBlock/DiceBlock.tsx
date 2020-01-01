import React from 'react';
import _ from 'lodash';
import {Dice} from '../../types';

type DiceBlockProps = {
  dice: Dice;
};

const DiceBlock: React.FC<DiceBlockProps> = ({dice}) => {
  const diceTypes: (keyof Dice)[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
  const diceStrings = diceTypes.map(diceType => {
    const numDice = dice[diceType];
    return numDice && numDice > 0 && `${numDice}${diceType}`;
  });

  if (dice.modifier && dice.modifier !== 0) {
    const modifier = dice.modifier > 0 ? `+ ${dice.modifier}` : `- ${-1 * dice.modifier}`;
    diceStrings.push(modifier);
  }

  const diceString = _.chain(diceStrings).compact().join(' ').value();

  return (
    <span>{diceString}</span>
  );
};

export default DiceBlock;
