import {Action, FullCharacterData} from '../../types';

const calculateToHit: (action: Action, character: FullCharacterData) => number = (action, character) => {
  const statModifier = (action.stat && character.statModifiers[action.stat]) || 0;
  const proficientModifier = action.proficient ? character.proficiency : 0;
  const hitModifier = action.hitModifier || 0;

  return hitModifier + statModifier + proficientModifier;
};
 
export default calculateToHit;
