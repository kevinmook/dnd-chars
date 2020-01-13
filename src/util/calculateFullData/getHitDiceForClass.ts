import {CharacterData, Dice} from '../../types';

const getHitDiceForClass = (className: keyof CharacterData['classes']): keyof Dice => {
  switch (className) {
    case 'barbarian':
      return 'd12';
    case 'fighter':
    case 'paladin':
    case 'ranger':
      return 'd10';
    case 'bard':
    case 'cleric':
    case 'druid':
    case 'monk':
    case 'rogue':
    case 'warlock':
      return 'd8';
    case 'sorcerer':
    case 'wizard':
      return 'd6';
  }
}

export default getHitDiceForClass;
