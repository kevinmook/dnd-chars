import {Stats} from '../../types';

const calculateStatModifiers = (stats: Stats): Stats => {
  const calculate = (stat: number): number =>
    Math.floor((stat - 10)/2);

  return {
    strength: calculate(stats.strength),
    dexterity: calculate(stats.dexterity),
    constitution: calculate(stats.constitution),
    intelligence: calculate(stats.intelligence),
    wisdom: calculate(stats.wisdom),
    charisma: calculate(stats.charisma),
  }
};

export default calculateStatModifiers;
