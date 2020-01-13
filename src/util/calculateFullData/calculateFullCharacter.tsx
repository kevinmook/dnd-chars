import _ from 'lodash';
import {CharacterData, FullCharacterData} from '../../types';
import calculateStatModifiers from './calculateStatModifiers';
import calculateSaves from './calculateSaves';
import calculateSkills from './calculateSkills';
import calculateHitDice from './calculateHitDice';
import calculateHp from './calculateHp';
import calculateSpellSlots from './calculateSpellSlots';
import calculatePactSlotLevel from './calculatePactSlotLevel';

type CalculateFullCharacterData = (characterData: CharacterData) => FullCharacterData;

const calculateFullCharacterData: CalculateFullCharacterData = characterData => {
  const level = _.chain(Object.values(characterData.classes)).map(charClass => charClass?.level || 0).sum().value();
  const proficiency = Math.floor((level - 1) / 4) + 2;

  const statModifiers = calculateStatModifiers(characterData.stats);
  const saves = calculateSaves(characterData.proficiencies, statModifiers, proficiency);
  const skills = calculateSkills(characterData, statModifiers, proficiency);
  const hitDice = calculateHitDice(characterData);
  const hp = calculateHp(characterData.startingClass, hitDice, statModifiers);
  const spellSlots = calculateSpellSlots(characterData.classes);

  const fullCharacterData: FullCharacterData = {
    ...characterData,
    classes: {
      ...characterData.classes,
      warlock: characterData.classes.warlock && {
        ...characterData.classes.warlock,
        pactSlotLevel: calculatePactSlotLevel(characterData.classes.warlock)
      },
    },
    hitDice,
    hp,
    level,
    statModifiers,
    proficiency,
    saves,
    skills,
    spellSlots
  };

  return fullCharacterData;
};

export default calculateFullCharacterData;
