import React from 'react';
import {CharacterData} from '../../types';
import StatBlock from './StatBlock';
import SkillBlock from './SkillBlock';
import Actions from './Actions';
import calculateFullCharacterData from './calculateFullCharacterData';

type CharacterProps = {
  characterData: CharacterData;
};

const Character: React.FC<CharacterProps> = ({characterData}) => {
  const fullCharacterData = calculateFullCharacterData(characterData);
  return (
    <div>
      <h3>{fullCharacterData.name}</h3>
      <StatBlock character={fullCharacterData} />
      <SkillBlock character={fullCharacterData} />
      <Actions character={fullCharacterData} />
    </div>
  );
};

export default Character;
