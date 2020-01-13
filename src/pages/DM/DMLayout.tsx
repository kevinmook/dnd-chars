import React from 'react';
import {styled} from 'linaria/react';
import {CreatureInstance} from './types';
import Creature from './Creature';

type DMLayoutProps = {
  creatureInstances: CreatureInstance[];
};

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
`;

const CreatureContainer = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
    height: 100%;
  }
`;

const Creatures = styled.div`
`;

const ActiveCreature = styled.div`
`;

const DMLayout: React.FC<DMLayoutProps> = ({creatureInstances}) => {
  return (
    <LayoutContainer>
      <Actions>
        Actions
      </Actions>
      <CreatureContainer>
        <Creatures>
          {creatureInstances.map(creatureInstance => (
            <Creature
              key={creatureInstance.creature.id}
              creatureInstance={creatureInstance}
            />
          ))}
        </Creatures>
        <ActiveCreature>
          Active Creature
        </ActiveCreature>
      </CreatureContainer>
    </LayoutContainer>
  );
};

export default DMLayout;
