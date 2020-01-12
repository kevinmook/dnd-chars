import React from 'react';
import Modal from 'react-modal';
import noScroll from 'no-scroll';
import {CharacterState, Action, FullCharacterData} from '../../types';
import {SetState} from '../../util';
import RollBox from '../RollBox';

Modal.setAppElement('#root')

type RollModalProps = {
  action: Action;
  character: FullCharacterData,
  characterState: CharacterState;
  onClose: () => void;
  open: boolean;
  setCharacterState: SetState<CharacterState>;
};

const RollModal: React.FC<RollModalProps> = ({action, character, characterState, open, onClose}) => {
  let clearRollBox: () => void = () => {};

  const handleClose = () => {
    clearRollBox();
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      onAfterOpen={() => { noScroll.on() }}
      onAfterClose={() => { noScroll.off() }}
    >
      <h2>{action?.name}</h2>

      <RollBox
        action={action}
        character={character}
        defaultStates={{
          advantage: characterState.advantage,
          guidance: characterState.guidance,
          sneakAttack: Boolean(character.classes.rogue?.level),
        }}
        modifiers={{
          elvenAccuracy: character.feats?.elvenAccuracy,
          rogueLevel: character.classes.rogue?.level,
        }}
        setClearCallback={callback => clearRollBox = callback}
      />

      <button onClick={handleClose}>close</button>
    </Modal>
  );
};

export default RollModal;
