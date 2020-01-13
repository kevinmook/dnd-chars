import {Proficiencies, Stat, Stats} from '../../types';
import calculateSkillModifier from './calculateSkillModifier';

const calculateSaves = (proficiencies: Partial<Proficiencies>, modifiers: Stats, proficiency: number): Stats => {
  const calculateSave = (stat: Stat): number => {
    return calculateSkillModifier({
      statModifier: modifiers[stat],
      skillProficiency: proficiencies[stat] || 'basic',
      proficiency,
    })
  };

  return {
    strength: calculateSave('strength'),
    dexterity: calculateSave('dexterity'),
    constitution: calculateSave('constitution'),
    intelligence: calculateSave('intelligence'),
    wisdom: calculateSave('wisdom'),
    charisma: calculateSave('charisma'),
  }
};

export default calculateSaves;
