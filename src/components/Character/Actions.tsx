import React from 'react';
import {styled} from 'linaria/react';
import {FullCharacterData, Action} from '../../types';
import Table, {CenteredCell} from '../Table';
import DiceBlock from '../DiceBlock';

type ActionsProps = {
  character: FullCharacterData;
  openRollModal: (action?: Action) => void;
};

const ClickableCenteredCell = styled(CenteredCell)`
  cursor: pointer;
`;

const Actions: React.FC<ActionsProps> = ({character, openRollModal}) => {
  return (
    <Table>
      <thead>
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
      </thead>
      <tbody>
        {character.actions.map(action => {
          const hitModifier = action.hitModifier?.(character) || 0;
          const damageDice = action.damage?.(character);

          return (
            <tr key={action.name}>
              <td>{action.name}</td>
              <CenteredCell>{action.range}</CenteredCell>
              <CenteredCell>{action.time}</CenteredCell>
              <CenteredCell>{hitModifier}</CenteredCell>
              <ClickableCenteredCell onClick={() => damageDice && openRollModal(action)}>{damageDice && <DiceBlock dice={damageDice} />}</ClickableCenteredCell>
              <td>{action.cost}</td>
              <td>{action.duration}</td>
              <td>{action.Note && <action.Note action={action} character={character} />}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Actions;
