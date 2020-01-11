import React from 'react';
import {Action, Dice} from '../../types';
import DiceBlock from '../../components/DiceBlock';

export const sneakAttackDamage: (rogueLevel?: number) => Dice = (rogueLevel = 0) => ({
  d6: Math.floor((rogueLevel + 1) / 2),
});

const sneakAttack: Action = {
  name: 'Sneak attack',
  damage: character => sneakAttackDamage(character.classes.rogue?.level),
  Note: ({action, character}) => <div>Once per turn, you can deal an extra {action.damage && <DiceBlock dice={action.damage(character)} />} damage to one creature you hit with an attack with a finesse or ranged weapon if you have advantage on the attack roll. You don’t need advantage on the attack roll if another enemy of the target is within 5 ft. of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.</div>,
};

export default sneakAttack;
