import React from 'react';

export type SkillProficiency = 'basic' | 'proficient' | 'expert';
export type Stat = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
export type Skill = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'slightOfHand' | 'stealth' | 'survival';
export type SpellLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'pact';
export type DamageType = 'piercing' | 'slashing';

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

export type Stats = {[key in Stat]: number};
export type SpellSlots = {[key in SpellLevels]: number};
export type Proficiencies = {[key in Skill | Stat]: SkillProficiency};

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
  feats?: {
    elvenAccuracy?: boolean;
  },
  name: string;
  proficiencies: Proficiencies,
  startingClass: keyof CharacterData['classes'],
  stats: Stats;
  walkingSpeed: number;
};

export type ActionDamage = {
  dice: Dice;
  magic?: boolean;
  type: DamageType;
};

export type Action = {
  cost?: string;
  damage?: ActionDamage;
  dc?: number;
  duration?: string;
  hitModifier?: number;
  name: string;
  Note?: React.FC<{character: FullCharacterData, action: Action}>;
  range?: string;
  stat?: Stat;
  proficient?: boolean;
  time?: string;
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
  statModifiers: Stats;
  proficiency: number;
  saves: Stats;
  skills: {[key in Skill]: number};
  spellSlots: SpellSlots;
};

export type CharacterState = {
  advantage: boolean;
  currentHp: number;
  temporaryHp: number;
  guidance: boolean;
};

export type DiceRoll = {
  diceSize: number;
  diceResult: number;
};

export type RollResultType = {
  attackRolls: DiceRoll[];
  attackBonusRolls: DiceRoll[];
  damageRolls: DiceRoll[];
};

export type Creature = {
  id: string;
  actions: Action[];
  hp: number;
  name: string;
  Note?: React.FC<{}>;
  spellSlots?: SpellSlots;
  stats: Stats;
  walkingSpeed: number;
};

export type FullCreature = Creature & {
  saves: Stats;
  statModifiers: Stats;
};

export type Encounter = {
  creatures: Creature[];
};
