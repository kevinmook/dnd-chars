import React from 'react';
import {styled} from 'linaria/react';
import {FullCharacterData, CharacterState, Action} from '../../types';
import {SetState} from '../../util';
import RollModal from '../RollModal';
import StatTable from './StatTable';
import SkillTable from './SkillTable';
import SavesTable from './SavesTable';
import SpellSlotTable from './SpellSlotTable';
import Actions from './Actions';

type CharacterLayoutProps = {
  activeAction: Action |  null;
  character: FullCharacterData;
  characterState: CharacterState;
  closeRollModal: () => void;
  openRollModal: (action?: Action) => void;
  rollModalOpen: boolean;
  setCharacterState: SetState<CharacterState>;
};

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    margin: 1em;
  }

  > *:last-child {
    margin-bottom: 1em;
  }
`;

const Name = styled.h3`
  text-align: center;
  width: 100%;
  margin: 1em 0;
`;

const SkillsAndActions = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 1em;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  > *:not(:first-child) {
    margin-top: 1em;
  }
`;

const CharacterLayout: React.FC<CharacterLayoutProps> = ({
  activeAction,
  character,
  characterState,
  rollModalOpen,
  openRollModal,
  setCharacterState,
  closeRollModal,
}) => {
  return (
    <CharacterContainer>
      <Name>{character.name} (level {character.level})</Name>
      <StatTable character={character} />
      <SkillsAndActions>
        <Actions character={character} openRollModal={openRollModal} />
        <Sidebar>
          <SkillTable character={character} />
          <SavesTable character={character} />
          <SpellSlotTable character={character} />
        </Sidebar>
      </SkillsAndActions>
      {activeAction && (
        <RollModal
          action={activeAction}
          character={character}
          characterState={characterState}
          onClose={closeRollModal}
          open={rollModalOpen}
          setCharacterState={setCharacterState}
        />
      )}
    </CharacterContainer>
  );
};

export default CharacterLayout;
