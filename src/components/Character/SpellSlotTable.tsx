import React from 'react';
import {styled} from 'linaria/react';
import {FullCharacterData, SpellLevels} from '../../types';
import Table from '../Table';

type SpellSlotTableProps = {
  character: FullCharacterData;
};

const StyledTable = styled(Table)`
  td {
    text-align: center;
  }
`;

const SpellSlotTable: React.FC<SpellSlotTableProps> = ({character}) => {
  if (!character.spellSlots.pact && !character.spellSlots[1]) {
    return null;
  }
  const spellLevels: SpellLevels[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <StyledTable>
      <thead>
        <tr>
          <th colSpan={3}>Spell Slots</th>
        </tr>
        <tr>
          <th>Level</th>
          <th>Slots</th>
          <th>Used</th>
        </tr>
      </thead>
      <tbody>
        {character.spellSlots.pact > 0 && (
          <tr>
            <td>Pact (lvl {character.classes.warlock?.pactSlotLevel})</td>
            <td>{character.spellSlots.pact}</td>
            <td></td>
          </tr>
        )}
        {
          spellLevels.map(slotLevel => {
            const spellSlots = character.spellSlots[slotLevel];
            if (spellSlots === 0) {
              return null;
            }

            return (
              <tr key={slotLevel}>
                <td>{slotLevel}</td>
                <td>{spellSlots}</td>
                <td></td>
              </tr>
            );
          })
        }
      </tbody>
    </StyledTable>
  );
};

export default SpellSlotTable;
