import React from 'react';
import {styled} from 'linaria/react';
import {CharacterData} from '../../types';
import StatBlock from './StatBlock';
import SkillBlock from './SkillBlock';
import Actions from './Actions';
import calculateFullCharacterData from './calculateFullCharacterData';

type CharacterProps = {
  characterData: CharacterData;
};

const CharacterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > * {
    margin: 1em;
  }
`;

const Name = styled.h3`
  text-align: center;
  width: 100%;
  margin-block-start: 1em;
  margin-block-end: 0;
`;

const SkillsAndActions = styled.div`
  display: flex;
  > *:not(:first-child) {
    margin-left: 1em;
  }
`;

const Character: React.FC<CharacterProps> = ({characterData}) => {
  const fullCharacterData = calculateFullCharacterData(characterData);
  return (
    <CharacterContainer>
      <Name>{fullCharacterData.name} (level {fullCharacterData.level})</Name>
      <StatBlock character={fullCharacterData} />
      <SkillsAndActions>
        <Actions character={fullCharacterData} />
        <SkillBlock character={fullCharacterData} />
      </SkillsAndActions>
    </CharacterContainer>
  );
};

export default Character;
