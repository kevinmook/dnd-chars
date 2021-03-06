import _ from 'lodash';
import {CharacterData, FullCharacterData, SkillProficiency, Stat, Dice, WarlockClass} from '../../types';

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

const calculateStatModifiers = (characterData: CharacterData): FullCharacterData['statModifiers'] => {
  const calculate = (stat: number): number =>
    Math.floor((stat - 10)/2);

  return {
    strength: calculate(characterData.stats.strength),
    dexterity: calculate(characterData.stats.dexterity),
    constitution: calculate(characterData.stats.constitution),
    intelligence: calculate(characterData.stats.intelligence),
    wisdom: calculate(characterData.stats.wisdom),
    charisma: calculate(characterData.stats.charisma),
  }
};

const calculateSaves = (characterData: CharacterData, modifiers: FullCharacterData['statModifiers'], proficiency: number): FullCharacterData['saves'] => {
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

const getHitDiceForClass = (className: keyof CharacterData['classes']): keyof Dice => {
  switch (className) {
    case 'barbarian':
      return 'd12';
    case 'fighter':
    case 'paladin':
    case 'ranger':
      return 'd10';
    case 'bard':
    case 'cleric':
    case 'druid':
    case 'monk':
    case 'rogue':
    case 'warlock':
      return 'd8';
    case 'sorcerer':
    case 'wizard':
      return 'd6';
  }
}

const getMaxHitDieValue = (hitDie: keyof Dice): number => {
  switch (hitDie) {
    case 'd12': return 12;
    case 'd10': return 10;
    case 'd8': return 8;
    case 'd6': return 6;
    default: return 0;
  }
}

const calculateHitDice = (characterData: CharacterData): Dice => {
  const dice: Dice = {};

  Object.entries(characterData.classes).forEach(([charClassName, charClass]) => {
    const level = charClass?.level || 0;
    const diceType = getHitDiceForClass(charClassName as keyof CharacterData['classes']);
    dice[diceType] = (dice[diceType] || 0) + level;
  });

  return dice;
};

const calculateHp = (startingClass: CharacterData['startingClass'], hitDice: Dice, statModifiers: FullCharacterData['statModifiers']): number => {
  const startingClassFirstHitDie = getHitDiceForClass(startingClass);
  let hp = getMaxHitDieValue(startingClassFirstHitDie) / 2 - 1; // we'll add back the rest of the die when iterating over the hit dice
  const constMod = statModifiers.constitution

  Object.entries(hitDice).forEach(([dice, level]) => {
    if (level && level > 0) {
      const amountPerLevel = getMaxHitDieValue(dice as keyof Dice) / 2 + 1;
      hp += level * (amountPerLevel + constMod);
    }
  });

  return hp;
};

const calculateSpellSlots = (classes: CharacterData['classes']): FullCharacterData['spellSlots'] => {
  // https://5thsrd.org/rules/multiclassing/
  // https://rpg.stackexchange.com/questions/102008/arcane-trickster-multiclass-spell-preparation
  const fullCasterLevels = _.chain([classes.bard, classes.cleric, classes.druid, classes.sorcerer, classes.wizard]).compact().map(charClass => charClass.level).sum().value();
  const halfCasterLevels = _.chain([classes.paladin, classes.ranger]).compact().map(charClass => charClass.level).sum().value();
  let casterLevel = fullCasterLevels + halfCasterLevels / 2;
  const lockLevel = classes.warlock?.level || 0;

  if (classes.rogue && classes.rogue.arcaneTrickster) {
    casterLevel += Math.ceil(classes.rogue.level / 3); // adjusted to match the non-multiclass table
  }
  if (classes.fighter && classes.fighter.eldrichKnight) {
    casterLevel += Math.ceil(classes.fighter.level / 3); // adjusted to match the non-multiclass table
  }
  casterLevel = Math.floor(casterLevel);

  let slot1 = 0;
  let slot2 = 0;
  let slot3 = 0;
  let slot4 = 0;
  let slot5 = 0;
  let slot6 = 0;
  let slot7 = 0;
  let slot8 = 0;
  let slot9 = 0;
  let pactSlots = 0;

  if (casterLevel >= 3) {
    slot1 = 4;
  } else if (casterLevel >= 2) {
    slot1 = 3;
  } else if (casterLevel >= 1) {
    slot1 = 2;
  }

  if (casterLevel >= 4) {
    slot2 = 3;
  } else if (casterLevel >= 3) {
    slot2 = 2;
  }

  if (casterLevel >= 6) {
    slot3 = 3;
  } else if (casterLevel >= 5) {
    slot3 = 2;
  }

  if (casterLevel >= 9) {
    slot4 = 3;
  } else if (casterLevel >= 8) {
    slot4 = 2;
  } else if (casterLevel >= 7) {
    slot4 = 1;
  }

  if (casterLevel >= 18) {
    slot5 = 3;
  } else if (casterLevel >= 10) {
    slot5 = 2;
  } else if (casterLevel >= 9) {
    slot5 = 1;
  }

  if (casterLevel >= 19) {
    slot6 = 2;
  } else if (casterLevel >= 11) {
    slot6 = 1;
  }

  if (casterLevel >= 20) {
    slot7 = 2;
  } else if (casterLevel >= 13) {
    slot7 = 1;
  }

  if (casterLevel >= 15) {
    slot8 = 1;
  }

  if (casterLevel >= 17) {
    slot9 = 1;
  }

  if (lockLevel >= 17) {
    pactSlots = 4;
  } else if (lockLevel >= 11) {
    pactSlots = 3;
  } else if (lockLevel >= 2) {
    pactSlots = 2;
  } else if (lockLevel >= 1) {
    pactSlots = 1;
  }

  return {
    1: slot1,
    2: slot2,
    3: slot3,
    4: slot4,
    5: slot5,
    6: slot6,
    7: slot7,
    8: slot8,
    9: slot9,
    pact: pactSlots,
  };
};

const calculatePactSlotLevel = (warlockClass: WarlockClass): number => {
  if (warlockClass.level >= 9) {
    return 5;
  } else {
    return Math.floor((warlockClass.level + 1) / 2)
  }
};

const calculateFullCharacterData: CalculateFullCharacterData = characterData => {
  const level = _.chain(Object.values(characterData.classes)).map(charClass => charClass?.level || 0).sum().value();
  const proficiency = Math.floor((level - 1) / 4) + 2;

  const statModifiers = calculateStatModifiers(characterData);
  const saves = calculateSaves(characterData, statModifiers, proficiency);
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
