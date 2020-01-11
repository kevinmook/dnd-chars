import React from 'react';
import Modal from 'react-modal';
import noScroll from 'no-scroll';
import {CharacterState, Action, FullCharacterData} from '../../types';
import {SetState} from '../../util';
import RollBox from '../RollBox';

Modal.setAppElement('#root')

type RollModalProps = {
  action: Action | null;
  character: FullCharacterData,
  characterState: CharacterState;
  onClose: () => void;
  open: boolean;
  setCharacterState: SetState<CharacterState>;
};

const RollModal: React.FC<RollModalProps> = ({action, character, characterState, open, onClose}) => {

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      onAfterOpen={() => { noScroll.on() }}
      onAfterClose={() => { noScroll.off() }}
    >
      <h2>{action?.name}</h2>

      <RollBox
        baseRoll={action?.damage?.(character) || {}}
        baseToHit={action?.hitModifier?.(character) || 0}
        defaultStates={{
          advantage: characterState.advantage,
          guidance: characterState.guidance,
          sneakAttack: Boolean(character.classes.rogue?.level),
        }}
        modifiers={{
          elvenAccuracy: character.feats?.elvenAccuracy,
          rogueLevel: character.classes.rogue?.level,
        }}
      />

      <button onClick={onClose}>close</button>
    </Modal>
  );
};

export default RollModal;
