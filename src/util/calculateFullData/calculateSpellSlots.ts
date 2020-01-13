import _ from 'lodash';
import {CharacterData, FullCharacterData} from '../../types';

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

export default calculateSpellSlots;
