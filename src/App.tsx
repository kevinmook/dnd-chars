import React from 'react';
// import Character from './pages/Character';
// import {slipS8 as selectedCharacter} from './characters';
// import {slipS9 as selectedCharacter} from './characters';
import DM from './pages/DM';
import {Encounter} from './types';

const encounter: Encounter = {
  creatures: [
    {
      id: 'testCreature1',
      actions: [],
      hp: 123,
      name: 'Test Creature 1',
      stats: {
        charisma: 10,
        constitution: 12,
        dexterity: 14,
        intelligence: 15,
        strength: 8,
        wisdom: 17,
      },
      walkingSpeed: 30,
    }
  ],
};

const App: React.FC = () => {
  return (
    <div className="App">
      { /* <Character characterData={selectedCharacter} /> */ }
      <DM encounter={encounter} />
    </div>
  );
}

export default App;
