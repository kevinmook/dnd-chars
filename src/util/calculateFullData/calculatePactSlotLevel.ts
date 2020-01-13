import {WarlockClass} from '../../types';

const calculatePactSlotLevel = (warlockClass: WarlockClass): number => {
  if (warlockClass.level >= 9) {
    return 5;
  } else {
    return Math.floor((warlockClass.level + 1) / 2)
  }
};

export default calculatePactSlotLevel;
