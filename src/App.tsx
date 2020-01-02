import React from 'react';
import Character from './components/Character';
import {slipS8 as slipS8Character} from './characters';

const App: React.FC = () => {
  return (
    <div className="App">
      <Character characterData={slipS8Character} />
    </div>
  );
}

export default App;
