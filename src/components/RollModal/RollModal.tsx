import React from 'react';
import Modal from 'react-modal';
import noScroll from 'no-scroll';
import _ from 'lodash';
import {CharacterState, Action, FullCharacterData, Dice} from '../../types';
import {SetState, addDice} from '../../util';
import {sneakAttack as sneakAttackAction} from '../../util/actions';
import DiceBlock from '../DiceBlock';
import RollResult, {RollResultType, rollDie} from './RollResult';

Modal.setAppElement('#root')

type RollModalProps = {
  action: Action | null;
  character: FullCharacterData,
  characterState: CharacterState;
  onClose: () => void;
  open: boolean;
  setCharacterState: SetState<CharacterState>;
};

const RollModal: React.FC<RollModalProps> = ({action, character, characterState, open, onClose, setCharacterState}) => {
  const [advantage, setAdvantage] = React.useState(false);
  const [sneakAttack, setSneakAttack] = React.useState(Boolean(character.classes.rogue?.level));
  const [rollResult, setRollResult] = React.useState<RollResultType | undefined>();
  const toggleSneakAttack = () => setSneakAttack(!sneakAttack);
  const toggleAdvantage = () => setAdvantage(!advantage);
  const toggleGuidance = () => setCharacterState(oldCharacterState => ({
    ...oldCharacterState,
    guidance: !characterState.guidance,
  }));

  let damageDice: Dice = action?.damage?.(character) || {};
  if (sneakAttack) {
    damageDice = addDice(damageDice, sneakAttackAction?.damage?.(character) || {})
  }

  const roll = () => {
    const newRollResult: RollResultType = {
      basicHitRolls: [],
      bonusHitRolls: [],
      plusToHit: action?.hitModifier?.(character) || 0,
      damageRolls: [],
      finalToHit: 0,
      finalDamage: 0,
    };

    newRollResult.basicHitRolls.push(rollDie(20));
    if (advantage) {
      newRollResult.basicHitRolls.push(rollDie(20));
      if (character.feats?.elvenAccuracy) {
        newRollResult.basicHitRolls.push(rollDie(20));
      }
    }
    if (characterState.guidance) {
      newRollResult.bonusHitRolls.push(rollDie(4));
    }
    const crit = _.some(newRollResult.basicHitRolls, roll => roll.diceResult === 20);

    Object.entries(damageDice).forEach(([diceSizeStr, diceCount]) => {
      let diceSize: undefined | number = undefined;
      switch (diceSizeStr as keyof Dice) {
        case 'd4': diceSize = 4; break;
        case 'd6': diceSize = 6; break;
        case 'd8': diceSize = 8; break;
        case 'd10': diceSize = 10; break;
        case 'd12': diceSize = 12; break;
        case 'd20': diceSize = 20; break;
      }

      if (diceSize && diceCount) {
        const critModifier = crit ? 2 : 1;
        const numRolls = diceCount * critModifier;

        for (let i = 0; i < numRolls; i++) {
          newRollResult.damageRolls.push(rollDie(diceSize));
        }
      }
    });

    newRollResult.finalToHit = _.chain(
      [
        _.max(newRollResult.basicHitRolls.map(roll => roll.diceResult)),
        _.sum(newRollResult.bonusHitRolls.map(roll => roll.diceResult)),
        newRollResult.plusToHit,
      ]
    ).compact().sum().value();

    newRollResult.finalDamage = _.chain(
      [
        _.sum(_.map(newRollResult.damageRolls, roll => roll.diceResult)),
        damageDice.modifier,
      ]
    ).compact().sum().value();

    setRollResult(newRollResult);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      onAfterOpen={() => { noScroll.on() }}
      onAfterClose={() => { noScroll.off() }}
    >
      <h2>{action?.name}</h2>

      <div>Advantage: {advantage ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleAdvantage}>Toggle advantage</button>
      </div>

      <div>Guidance: {characterState.guidance ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleGuidance}>Toggle guidance</button>
      </div>

      <div>Sneak attack: {sneakAttack ? 'true' : 'false'}</div>
      <div>
        <button onClick={toggleSneakAttack}>Toggle sneak attack</button>
      </div>

      <div>Attack for <DiceBlock dice={damageDice} /></div>

      {rollResult && <RollResult rollResult={rollResult} />}

      <button onClick={roll}>Roll</button>
      <button onClick={onClose}>close</button>
    </Modal>
  );
};

export default RollModal;
