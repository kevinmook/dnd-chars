import {Action, FullCharacterData} from '../../types';

const calculateToHit: (action: Action, character: FullCharacterData) => number = (action, character) => {
  const statModifier = character.
  const proficientModifier = action.proficient ? 
  return action.hitModifier + 
};

export default calculateToHit;

