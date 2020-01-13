import {Dice} from '../../types';

const getMaxHitDieValue = (hitDie: keyof Dice): number => {
  switch (hitDie) {
    case 'd12': return 12;
    case 'd10': return 10;
    case 'd8': return 8;
    case 'd6': return 6;
    default: return 0;
  }
}

export default getMaxHitDieValue;
