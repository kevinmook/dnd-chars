import React from 'react';
import {FullCharacterData} from '../../types';
import Table, {CenteredCell} from '../Table';

type SavesTableProps = {
  character: FullCharacterData;
};

const SaveRow: React.FC<{name: string, stat: keyof FullCharacterData['saves'], character: FullCharacterData}> = ({name, stat, character}) => {
  const statValue = character.saves[stat];
  let proficiencyStars = '';
  if (character.proficiencies[stat] === 'proficient') {
    proficiencyStars = '*';
  } else if (character.proficiencies[stat] === 'expert') {
    proficiencyStars = '**';
  }

  return (
    <tr>
      <td>{name}{proficiencyStars}</td>
      <CenteredCell>{statValue}</CenteredCell>
    </tr>
  );
};

const SavesTable: React.FC<SavesTableProps> = ({character}) => (
  <Table>
    <thead>
      <tr>
        <th>Stat</th>
        <th>Bonus</th>
      </tr>
    </thead>
    <tbody>
      <SaveRow name="Strength" stat="strength" character={character} />
      <SaveRow name="Dexterity" stat="dexterity" character={character} />
      <SaveRow name="Constitution" stat="constitution" character={character} />
      <SaveRow name="Intelligence" stat="intelligence" character={character} />
      <SaveRow name="Wisdom" stat="wisdom" character={character} />
      <SaveRow name="Charisma" stat="charisma" character={character} />
    </tbody>
  </Table>
);

export default SavesTable;
