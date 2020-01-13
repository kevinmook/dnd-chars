import React from 'react';
import {styled} from 'linaria/react';
import {CreatureInstance} from './types';

type DMLayoutProps = {
  creatures: CreatureInstance[];
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

const DMLayout: React.FC<DMLayoutProps> = () => {
  return (
    <LayoutContainer>
      <Actions>
        Actions
      </Actions>
      <CreatureContainer>
        <Creatures>
          Creatures
        </Creatures>
        <ActiveCreature>
          Active Creature
        </ActiveCreature>
      </CreatureContainer>
    </LayoutContainer>
  );
};

export default DMLayout;
