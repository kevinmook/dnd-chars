import _ from 'lodash';
import {assertNever} from '../../util';
import {CharacterData, FullCharacterData, SkillProficiency, Stat, CharacterClass, Dice} from '../../types';

type CalculateFullCharacterData = (characterData: CharacterData) => FullCharacterData;

type CalculateSkillModifier = (args: {statModifier: number, skillProficiency: SkillProficiency, proficiency: number}) => number;
const calculateSkillModifier: CalculateSkillModifier = ({statModifier, skillProficiency, proficiency}) => {
  let skillModifier = 0;
  if (skillProficiency === 'proficient') {
    skillModifier += proficiency;
  } else if (skillProficiency === 'expert') {
    skillModifier += proficiency * 2;
  }

  return statModifier + skillModifier;
};

const calculateModifiers = (characterData: CharacterData): FullCharacterData['modifiers'] => {
  const calculateStatModifier = (stat: number): number =>
    Math.floor((stat - 10)/2);

  return {
    strength: calculateStatModifier(characterData.stats.strength),
    dexterity: calculateStatModifier(characterData.stats.dexterity),
    constitution: calculateStatModifier(characterData.stats.constitution),
    intelligence: calculateStatModifier(characterData.stats.intelligence),
    wisdom: calculateStatModifier(characterData.stats.wisdom),
    charisma: calculateStatModifier(characterData.stats.charisma),
  }
};

const calculateSaves = (characterData: CharacterData, modifiers: FullCharacterData['modifiers'], proficiency: number): FullCharacterData['saves'] => {
  const calculateSave = (stat: Stat): number => {
    return calculateSkillModifier({
      statModifier: modifiers[stat],
      skillProficiency: characterData.proficiencies[stat],
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

const calculateSkills = (characterData: CharacterData, proficiency: number): FullCharacterData['skills'] => {
  const calculateSkill = (skill: keyof FullCharacterData['proficiencies'], stat: Stat): number => {
    return calculateSkillModifier({
      statModifier: characterData.stats[stat],
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

const calculateHitDice = (characterData: CharacterData): Dice => {
  const dice: Dice = {};

  Object.entries(characterData.classes).forEach(([charClass2, level]) => {
    const charClass = charClass2 as CharacterClass | undefined; // bugbug typescript workaround
    switch (charClass) {
      case 'barbarian':
        dice['d12'] = (dice['d12'] || 0) + (level || 0);
        break;
      case 'bard':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'cleric':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'druid':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'fighter':
        dice['d10'] = (dice['d10'] || 0) + (level || 0);
        break;
      case 'monk':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'paladin':
        dice['d10'] = (dice['d10'] || 0) + (level || 0);
        break;
      case 'ranger':
        dice['d10'] = (dice['d10'] || 0) + (level || 0);
        break;
      case 'rogue':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'sorcerer':
        dice['d6'] = (dice['d6'] || 0) + (level || 0);
        break;
      case 'warlock':
        dice['d8'] = (dice['d8'] || 0) + (level || 0);
        break;
      case 'wizard':
        dice['d6'] = (dice['d6'] || 0) + (level || 0);
        break;
      case undefined:
        break;
      default:
        assertNever(charClass);
    }
  });

  return dice;
};

const calculateHp = (hitDice: Dice): number => {
  let hp = 0;

  Object.entries(hitDice).forEach(([dice, amount]) => {
    if (amount) {
      switch (dice) {
        case 'd6':
          hp += amount * 4;
          break;
        case 'd8':
          hp += amount * 5;
          break;
        case 'd10':
          hp += amount * 6;
          break;
        case 'd12':
          hp += amount * 7;
          break;
      }
    }
  });

  return hp;
};

const calculateSpellSlots = (classes: CharacterData['classes']): FullCharacterData['spellSlots'] => {
  console.log(classes);

  return {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
};

const calculateFullCharacterData: CalculateFullCharacterData = characterData => {
  const level = _.sum(Object.values(characterData.classes));
  const proficiency = Math.floor((level - 1) / 4) + 2;

  const modifiers = calculateModifiers(characterData);
  const saves = calculateSaves(characterData, modifiers, proficiency);
  const skills = calculateSkills(characterData, proficiency);
  const hitDice = calculateHitDice(characterData);
  const hp = calculateHp(hitDice);
  const spellSlots = calculateSpellSlots(characterData.classes);

  const fullCharacterData: FullCharacterData = {
    ...characterData,
    hitDice,
    hp,
    level,
    modifiers,
    proficiency,
    saves,
    skills,
    spellSlots
  };

  return fullCharacterData;
};

export default calculateFullCharacterData;
