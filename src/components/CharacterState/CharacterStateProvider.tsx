import React, {ReactNode} from 'react';
import CharacterStateContext from './CharacterStateContext';

type CharacterStateProviderProps = {
  children: ReactNode;
};

const CharacterStateProvider = ({children}: CharacterStateProviderProps) => (
  <CharacterStateContext.Provider value={{}}>
    {children}
  </CharacterStateContext.Provider>
);

export default CharacterStateProvider;
