import {Creature, FullCreature} from '../../types';
import calculateStatModifiers from './calculateStatModifiers';
import calculateSaves from './calculateSaves';

type CalculateFullCreatureData = (creature: Creature) => FullCreature;

const calculateFullCreature: CalculateFullCreatureData = creature => {
  const statModifiers = calculateStatModifiers(creature.stats);
  const saves = calculateSaves({}, statModifiers, 0);
  const fullCreature: FullCreature = {
    ...creature,
    statModifiers: statModifiers,
    saves,
  };

  return fullCreature;
};

export default calculateFullCreature;
