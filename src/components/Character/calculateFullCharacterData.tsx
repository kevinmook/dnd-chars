import {CharacterData, FullCharacterData, SkillLevel} from '../../types';

type CalculateFullCharacterData = (characterData: CharacterData) => FullCharacterData;

const calculateFullCharacterData: CalculateFullCharacterData = characterData => {
  const proficiency = Math.floor((characterData.level - 1) / 4) + 2;
  const calculateSkillModifier = (statModifier: number, skillLevel: SkillLevel): number => {
    let skillModifier = 0;
    if (skillLevel === 'proficient') {
      skillModifier += proficiency;
    } else if (skillLevel === 'expert') {
      skillModifier += proficiency * 2;
    }

    return statModifier + skillModifier;
  };
  const calculateStatModifier = (stat: number): number =>
    Math.floor((stat - 10)/2);

  const strengthModifier = calculateStatModifier(characterData.stats.strength);
  const dexterityModifier = calculateStatModifier(characterData.stats.dexterity);
  const constitutionModifier = calculateStatModifier(characterData.stats.constitution);
  const intelligenceModifier = calculateStatModifier(characterData.stats.intelligence);
  const wisdomModifier = calculateStatModifier(characterData.stats.wisdom);
  const charismaModifier = calculateStatModifier(characterData.stats.charisma);

  const fullCharacterData: FullCharacterData = {
    ...characterData,
    proficiency,
    modifiers: {
      acrobatics: calculateSkillModifier(dexterityModifier, characterData.skills.acrobatics),
      animalHandling: calculateSkillModifier(wisdomModifier, characterData.skills.animalHandling),
      arcana: calculateSkillModifier(intelligenceModifier, characterData.skills.arcana),
      athletics: calculateSkillModifier(strengthModifier, characterData.skills.athletics),
      deception: calculateSkillModifier(charismaModifier, characterData.skills.deception),
      history: calculateSkillModifier(intelligenceModifier, characterData.skills.history),
      insight: calculateSkillModifier(wisdomModifier, characterData.skills.insight),
      intimidation: calculateSkillModifier(charismaModifier, characterData.skills.intimidation),
      investigation: calculateSkillModifier(intelligenceModifier, characterData.skills.investigation),
      medicine: calculateSkillModifier(wisdomModifier, characterData.skills.medicine),
      nature: calculateSkillModifier(intelligenceModifier, characterData.skills.nature),
      perception: calculateSkillModifier(wisdomModifier, characterData.skills.perception),
      performance: calculateSkillModifier(charismaModifier, characterData.skills.performance),
      persuasion: calculateSkillModifier(charismaModifier, characterData.skills.persuasion),
      religion: calculateSkillModifier(intelligenceModifier, characterData.skills.religion),
      slightOfHand: calculateSkillModifier(dexterityModifier, characterData.skills.slightOfHand),
      stealth: calculateSkillModifier(dexterityModifier, characterData.skills.stealth),
      survival: calculateSkillModifier(wisdomModifier, characterData.skills.survival),
      strengthSave: calculateSkillModifier(strengthModifier, characterData.skills.strength),
      dexteritySave: calculateSkillModifier(dexterityModifier, characterData.skills.dexterity),
      constitutionSave: calculateSkillModifier(constitutionModifier, characterData.skills.constitution),
      intelligenceSave: calculateSkillModifier(intelligenceModifier, characterData.skills.intelligence),
      wisdomSave: calculateSkillModifier(wisdomModifier, characterData.skills.wisdom),
      charismaSave: calculateSkillModifier(charismaModifier, characterData.skills.charisma),

      strength: strengthModifier,
      dexterity: dexterityModifier,
      constitution: constitutionModifier,
      intelligence: intelligenceModifier,
      wisdom: wisdomModifier,
      charisma: charismaModifier,
    },
  };

  return fullCharacterData;
};

export default calculateFullCharacterData;
