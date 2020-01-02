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

const NameContainer = styled.h3`
  text-align: center;
`;

const Character: React.FC<CharacterProps> = ({characterData}) => {
  const fullCharacterData = calculateFullCharacterData(characterData);
  return (
    <div>
      <NameContainer>{fullCharacterData.name}</NameContainer>
      <StatBlock character={fullCharacterData} />
      <SkillBlock character={fullCharacterData} />
      <Actions character={fullCharacterData} />
    </div>
  );
};

export default Character;
