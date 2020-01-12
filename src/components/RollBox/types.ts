import {RollResultType} from '../../types';

export type RollResultWithTotals = RollResultType & {
  plusToHit: number;
  finalToHit: number;
  finalDamage: number;
};
