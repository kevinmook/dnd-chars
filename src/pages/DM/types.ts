import {FullCreature} from '../../types';

export type CreatureInstance = {
  creature: FullCreature;
  currentHp: number;
  initiative?: number;
};
