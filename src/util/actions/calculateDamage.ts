import {Action, FullCharacterData, Dice} from '../../types';
import {addDice} from '../../util';
import calculateSneakAttackDamage from './calculateSneakAttackDamage';

type CalculateDamage = (args:{
  action: Action;
  character: FullCharacterData;
  crit?: boolean;
  sneakAttack?: boolean;
  offhand?: boolean;
}) => Dice;

const calculateDamage: CalculateDamage = ({
  action,
  character,
  sneakAttack,
}) => {
  const statModifier = (action.stat && character.statModifiers[action.stat]) || 0;
  const sneakAttackDice = (sneakAttack && calculateSneakAttackDamage(character.classes.rogue?.level || 0)) || {};

  const damageDice: Dice = addDice(
    action.damage?.dice,
    sneakAttackDice,
    {
      modifier: statModifier,
    }
  );

  return damageDice;
};
 
export default calculateDamage;
