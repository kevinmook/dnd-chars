import React from 'react';
import {styled} from 'linaria/react';
import {FullCharacterData} from '../../types';
import Table from '../../components/Table';

type StatTableProps = {
  character: FullCharacterData;
};

const StatTableTable = styled(Table)`
  text-align: center;
  margin: auto;
`;

const StatTable: React.FC<StatTableProps> = ({character}) => {
  return (
    <StatTableTable>
      <thead>
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
          <th>Temp HP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{character.stats.strength}</td>
          <td>{character.stats.dexterity}</td>
          <td>{character.stats.constitution}</td>
          <td>{character.stats.intelligence}</td>
          <td>{character.stats.wisdom}</td>
          <td>{character.stats.charisma}</td>
          <td rowSpan={2}>{character.armorClass}</td>
          <td rowSpan={2}>{character.statModifiers.dexterity}</td>
          <td rowSpan={2}>{character.walkingSpeed}</td>
          <td>{character.hp}</td>
          <td rowSpan={2}></td>
        </tr>
        <tr>
          <td>{character.statModifiers.strength}</td>
          <td>{character.statModifiers.dexterity}</td>
          <td>{character.statModifiers.constitution}</td>
          <td>{character.statModifiers.intelligence}</td>
          <td>{character.statModifiers.wisdom}</td>
          <td>{character.statModifiers.charisma}</td>
          <td></td>
        </tr>
      </tbody>
    </StatTableTable>
  );
};

export default StatTable;
