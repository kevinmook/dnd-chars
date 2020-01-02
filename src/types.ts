import React from 'react';

export type SkillProficiency = 'basic' | 'proficient' | 'expert';
export type Stat = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
export type CharacterClass = 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard';
export type Skill = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'slightOfHand' | 'stealth' | 'survival';
export type SpellLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CharacterData = {
  actions: Action[];
  armorClass: number;
  classes: Partial<{[key in CharacterClass]: number}>;
  name: string;
  proficiencies: {[key in Skill | Stat]: SkillProficiency},
  stats: {[key in Stat]: number},
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

export type Dice = Partial<{
  d4: number;
  d6: number;
  d8: number;
  d10: number;
  d12: number;
  d20: number;
  modifier: number;
}>;

export type FullCharacterData = CharacterData & {
  hitDice: Dice;
  hp: number;
  level: number;
  modifiers: {[key in Stat]: number};
  proficiency: number;
  saves: {[key in Stat]: number};
  skills: {[key in Skill]: number};
  spellSlots: {[key in SpellLevels]: number};
};
