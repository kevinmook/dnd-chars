import React from 'react';
import {FullCharacterData, SpellLevels} from '../../types';
import Table, {CenteredCell} from '../Table';

type SpellSlotTableProps = {
  character: FullCharacterData;
};

const SpellSlotTable: React.FC<SpellSlotTableProps> = ({character}) => {
  if (!character.spellSlots.pact && !character.spellSlots[1]) {
    return null;
  }
  const spellLevels: SpellLevels[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Table>
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
            <CenteredCell>Pact (lvl {character.classes.warlock?.pactSlotLevel})</CenteredCell>
            <CenteredCell>{character.spellSlots.pact}</CenteredCell>
            <CenteredCell></CenteredCell>
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
                <CenteredCell>{slotLevel}</CenteredCell>
                <CenteredCell>{spellSlots}</CenteredCell>
                <CenteredCell></CenteredCell>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};

export default SpellSlotTable;
