import {useContext} from 'react';
import CharacterStateContext from './CharacterStateContext';

const useCharacterState = () => useContext(CharacterStateContext);

export default useCharacterState;
