import React from 'react';
import {Action} from '../../types';
import DiceBlock from '../../components/DiceBlock';


const sneakAttack: Action = {
  name: 'Sneak attack',
  damage: character => ({
    d6: Math.floor((character.level + 1) / 2),
  }),
  Note: ({action, character}) => <div>Once per turn, you can deal an extra {action.damage && <DiceBlock dice={action.damage(character)} />} damage to one creature you hit with an attack with a finesse or ranged weapon if you have advantage on the attack roll. You don’t need advantage on the attack roll if another enemy of the target is within 5 ft. of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.</div>,
};

export default sneakAttack;
