import React from 'react';
import {CharacterData, CharacterState, Action} from '../../types';
import {calculateFullCharacter} from '../../util/calculateFullData';
import {CharacterStateProvider} from '../../components/CharacterState';
import CharacterLayout from './CharacterLayout';

type CharacterProps = {
  characterData: CharacterData;
};

const Character: React.FC<CharacterProps> = ({characterData}) => {
  const fullCharacterData = calculateFullCharacter(characterData);
  const [characterState, setCharacterState] = React.useState<CharacterState>({
    advantage: false,
    currentHp: fullCharacterData.hp,
    temporaryHp: 0,
    guidance: false,
  });
  const [rollModalOpen, setRollModalOpen] = React.useState(false);
  const [activeAction, setActiveAction] = React.useState<Action | null>(null);

  const handleCloseRollModal = () => {
    setRollModalOpen(false);
    setActiveAction(null);
  }
  const handleOpenRollModal = (action?: Action) => {
    setActiveAction(action || null);
    setRollModalOpen(true);
  };
  
  return (
    <CharacterStateProvider>
      <CharacterLayout
        activeAction={activeAction}
        character={fullCharacterData}
        characterState={characterState}
        rollModalOpen={rollModalOpen}
        setCharacterState={setCharacterState}
        closeRollModal={handleCloseRollModal}
        openRollModal={handleOpenRollModal}
      />
    </CharacterStateProvider>
  );
};

export default Character;
