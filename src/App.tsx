import React from 'react';
import Character from './components/Character';
// import {slipS8 as selectedCharacter} from './characters';
import {slipS9 as selectedCharacter} from './characters';

const App: React.FC = () => {
  return (
    <div className="App">
      <Character characterData={selectedCharacter} />
    </div>
  );
}

export default App;
