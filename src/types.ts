import React from 'react';

export type CharacterData = {
  actions: Action[];
  armorClass: number;
  level: number;
  name: string;
  skills: {
    acrobatics: SkillLevel;
    animalHandling: SkillLevel;
    arcana: SkillLevel;
    athletics: SkillLevel;
    deception: SkillLevel;
    history: SkillLevel;
    insight: SkillLevel;
    intimidation: SkillLevel;
    investigation: SkillLevel;
    medicine: SkillLevel;
    nature: SkillLevel;
    perception: SkillLevel;
    performance: SkillLevel;
    persuasion: SkillLevel;
    religion: SkillLevel;
    slightOfHand: SkillLevel;
    stealth: SkillLevel;
    survival: SkillLevel;
    strength: SkillLevel;
    dexterity: SkillLevel;
    constitution: SkillLevel;
    intelligence: SkillLevel;
    wisdom: SkillLevel;
    charisma: SkillLevel;
  },
  spellSlots: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
  };
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  },
  walkingSpeed: number;
};

export type Action = {
  name: string;
  range?: string;
  time?: string;
  hit?: ((character: FullCharacterData) => Dice);
  dc?: number;
  dcStat?: string;
  damage?: ((character: FullCharacterData) => Dice);
  cost?: string;
  duration?: string;
  Note?: React.FC<{character: FullCharacterData, action: Action}>;
};

export type Dice = {
  d4?: number;
  d6?: number;
  d8?: number;
  d10?: number;
  d12?: number;
  d20?: number;
  modifier?: number;
};

export type SkillLevel = 'basic' | 'proficient' | 'expert';

export type FullCharacterData = CharacterData & {
  proficiency: number;
  modifiers: {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    slightOfHand: number;
    stealth: number;
    survival: number;
    strengthSave: number;
    dexteritySave: number;
    constitutionSave: number;
    intelligenceSave: number;
    wisdomSave: number;
    charismaSave: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  },
};
