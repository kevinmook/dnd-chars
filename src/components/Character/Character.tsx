import React from 'react';
import {styled} from 'linaria/react';
import {CharacterData} from '../../types';
import StatTable from './StatTable';
import SkillTable from './SkillTable';
import SpellSlotTable from './SpellSlotTable';
import Actions from './Actions';
import calculateFullCharacterData from './calculateFullCharacterData';

type CharacterProps = {
  characterData: CharacterData;
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

const Character: React.FC<CharacterProps> = ({characterData}) => {
  const fullCharacterData = calculateFullCharacterData(characterData);
  return (
    <CharacterContainer>
      <Name>{fullCharacterData.name} (level {fullCharacterData.level})</Name>
      <StatTable character={fullCharacterData} />
      <SkillsAndActions>
        <Actions character={fullCharacterData} />
        <Sidebar>
          <SkillTable character={fullCharacterData} />
          <SpellSlotTable character={fullCharacterData} />
        </Sidebar>
      </SkillsAndActions>
    </CharacterContainer>
  );
};

export default Character;
