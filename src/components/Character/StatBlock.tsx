import React from 'react';
import {styled} from 'linaria/react';
import {FullCharacterData} from '../../types';
import Table from '../Table';

type StatBlockProps = {
  character: FullCharacterData;
};

const StatBlockTable = styled(Table)`
  text-align: center;
`;

const StatBlock: React.FC<StatBlockProps> = ({character}) => {
  return (
    <StatBlockTable>
      <tr>
        <th>Strength</th>
        <th>Dexterity</th>
        <th>Constitution</th>
        <th>Intelligence</th>
        <th>Wisdom</th>
        <th>Charisma</th>
        <th>AC</th>
        <th>Initiative</th>
        <th>Walking Speed</th>
        <th>HP</th>
      </tr>
      <tr>
        <td>{character.stats.strength}</td>
        <td>{character.stats.dexterity}</td>
        <td>{character.stats.constitution}</td>
        <td>{character.stats.intelligence}</td>
        <td>{character.stats.wisdom}</td>
        <td>{character.stats.charisma}</td>
        <td rowSpan={2}>{character.armorClass}</td>
        <td rowSpan={2}>{character.modifiers.dexterity}</td>
        <td rowSpan={2}>{character.walkingSpeed}</td>
        <td>{character.hp}</td>
      </tr>
      <tr>
        <td>{character.modifiers.strength}</td>
        <td>{character.modifiers.dexterity}</td>
        <td>{character.modifiers.constitution}</td>
        <td>{character.modifiers.intelligence}</td>
        <td>{character.modifiers.wisdom}</td>
        <td>{character.modifiers.charisma}</td>
        <td></td>
      </tr>
    </StatBlockTable>
  );
};

export default StatBlock;
