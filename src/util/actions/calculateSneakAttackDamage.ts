import {Dice} from '../../types';

const calculateSneakAttackDamage: (rogueLevel?: number) => Dice = (rogueLevel = 0) => ({
  d6: Math.ceil(rogueLevel / 2),
});

export default calculateSneakAttackDamage;
