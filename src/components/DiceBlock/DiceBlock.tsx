import React from 'react';
import _ from 'lodash';
import {Dice} from '../../types';

type DiceBlockProps = {
  dice: Dice;
};

const DiceBlock: React.FC<DiceBlockProps> = ({dice}) => {
  const diceTypes: (keyof Dice)[] = ['d20', 'd12', 'd10', 'd8', 'd6', 'd4'];
  const diceStrings = diceTypes.map(diceType => {
    const numDice = dice[diceType];
    return numDice && numDice > 0 && `${numDice}${diceType}`;
  });

  let diceString = _.chain(diceStrings).compact().join(' + ').value();

  if (dice.modifier && dice.modifier !== 0) {
    const modifier = dice.modifier > 0 ? `+ ${dice.modifier}` : `- ${-1 * dice.modifier}`;
    if (diceString.length > 0) {
      diceString = `${diceString} ${modifier}`
    } else {
      diceString = modifier;
    }
  }

  return (
    <span>{diceString}</span>
  );
};

export default DiceBlock;
