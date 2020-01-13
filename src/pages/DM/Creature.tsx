import React from 'react';
import {styled} from 'linaria/react';
import {CreatureInstance} from './types';

type CreatureProps = {
  creatureInstance: CreatureInstance
};

const CreatureContainer = styled.div`
  height: 75px;
  background-color: tan;
`;

const Name = styled.div``;
const HP = styled.div``;
const Initiative = styled.div``;

const Creature: React.FC<CreatureProps> = ({creatureInstance}) => {

  return (
    <CreatureContainer>
      <Name>{creatureInstance.creature.name}</Name>
      <HP>{creatureInstance.currentHp} / {creatureInstance.creature.hp}</HP>
      {creatureInstance.initiative ?? <Initiative>{creatureInstance.initiative}</Initiative>}
    </CreatureContainer>
  );
};

export default Creature;
