import React from 'react';
import {Encounter} from '../../types';
import {calculateFullCreature} from '../../util/calculateFullData';
import {CreatureInstance} from './types';
import DMLayout from './DMLayout';

type DMProps = {
  encounter: Encounter;
};

const DM: React.FC<DMProps> = ({encounter}) => {
  const creatureInstances: CreatureInstance[] = encounter.creatures.map(creature => ({
    creature: calculateFullCreature(creature),
    currentHp: 10,
  }));

  return (
    <DMLayout
      creatures={creatureInstances}
    />
  );
};

export default DM;
