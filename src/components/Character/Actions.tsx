import React from 'react';
import {FullCharacterData} from '../../types';
import Table from '../Table';
import DiceBlock from '../DiceBlock';

type ActionsProps = {
  character: FullCharacterData;
};

const Actions: React.FC<ActionsProps> = ({character}) => {
  return (
    <Table>
      <tr>
        <th>Action</th>
        <th>Range</th>
        <th>Time</th>
        <th>Hit / DC</th>
        <th>Damage</th>
        <th>Cost</th>
        <th>Duration</th>
        <th>Notes</th>
      </tr>
      {character.actions.map(action => {
        const hitDice = action.hit?.(character);
        const damageDice = action.damage?.(character);

        return (
          <tr key={action.name}>
            <td>{action.name}</td>
            <td>{action.range}</td>
            <td>{action.time}</td>
            <td>{hitDice && <DiceBlock dice={hitDice} />}</td>
            <td>{damageDice && <DiceBlock dice={damageDice} />}</td>
            <td>{action.cost}</td>
            <td>{action.duration}</td>
            <td>{action.Note && <action.Note />}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default Actions;
