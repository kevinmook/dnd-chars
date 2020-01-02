import React from 'react';

export type SkillProficiency = 'basic' | 'proficient' | 'expert';
export type Stat = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
export type Skill = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'slightOfHand' | 'stealth' | 'survival';
export type SpellLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'pact';

export type CharacterClass = {
  level: number;
};

export type BarbarianClass = CharacterClass;
export type BardClass = CharacterClass;
export type ClericClass = CharacterClass;
export type DruidClass = CharacterClass;
export type FighterClass = CharacterClass & {
  eldrichKnight: boolean;
};
export type MonkClass = CharacterClass;
export type PaladinClass = CharacterClass;
export type RangerClass = CharacterClass;
export type RogueClass = CharacterClass & {
  arcaneTrickster: boolean;
};
export type SorcererClass = CharacterClass;
export type WarlockClass = CharacterClass;
export type FullWarlockClass = WarlockClass & {
  pactSlotLevel: number;
};
export type WizardClass = CharacterClass;

export type CharacterData = {
  actions: Action[];
  armorClass: number;
  classes: {
    barbarian?: BarbarianClass;
    bard?: BardClass;
    cleric?: ClericClass;
    druid?: DruidClass;
    fighter?: FighterClass;
    monk?: MonkClass;
    paladin?: PaladinClass;
    ranger?: RangerClass;
    rogue?: RogueClass;
    sorcerer?: SorcererClass;
    warlock?: WarlockClass;
    wizard?: WizardClass;
  };
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

export type FullCharacterData = Omit<CharacterData, 'classes'> & {
  classes: Omit<CharacterData['classes'], 'warlock'> & {
    warlock?: FullWarlockClass,
  },
  hitDice: Dice;
  hp: number;
  level: number;
  modifiers: {[key in Stat]: number};
  proficiency: number;
  saves: {[key in Stat]: number};
  skills: {[key in Skill]: number};
  spellSlots: {[key in SpellLevels]: number};
};
