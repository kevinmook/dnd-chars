import {SkillProficiency} from '../../types';

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

export default calculateSkillModifier;
