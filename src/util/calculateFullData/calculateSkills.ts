import {CharacterData, FullCharacterData, Stat} from '../../types';
import calculateSkillModifier from './calculateSkillModifier';

const calculateSkills = (characterData: CharacterData, modifiers: FullCharacterData['statModifiers'], proficiency: number): FullCharacterData['skills'] => {
  const calculateSkill = (skill: keyof FullCharacterData['proficiencies'], stat: Stat): number => {
    return calculateSkillModifier({
      statModifier: modifiers[stat],
      skillProficiency: characterData.proficiencies[skill],
      proficiency,
    })
  };

  return {
    acrobatics: calculateSkill('acrobatics', 'dexterity'),
    animalHandling: calculateSkill('animalHandling', 'wisdom'),
    arcana: calculateSkill('arcana', 'intelligence'),
    athletics: calculateSkill('athletics', 'strength'),
    deception: calculateSkill('deception', 'charisma'),
    history: calculateSkill('history', 'intelligence'),
    insight: calculateSkill('insight', 'wisdom'),
    intimidation: calculateSkill('intimidation', 'charisma'),
    investigation: calculateSkill('investigation', 'intelligence'),
    medicine: calculateSkill('medicine', 'wisdom'),
    nature: calculateSkill('nature', 'intelligence'),
    perception: calculateSkill('perception', 'wisdom'),
    performance: calculateSkill('performance', 'charisma'),
    persuasion: calculateSkill('persuasion', 'charisma'),
    religion: calculateSkill('religion', 'intelligence'),
    slightOfHand: calculateSkill('slightOfHand', 'dexterity'),
    stealth: calculateSkill('stealth', 'dexterity'),
    survival: calculateSkill('survival', 'wisdom'),
  };
};

export default calculateSkills;
