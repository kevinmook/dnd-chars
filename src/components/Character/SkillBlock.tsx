import React from 'react';
import {FullCharacterData} from '../../types';
import Table from '../Table';

type SkillBlockProps = {
  character: FullCharacterData;
};

const SkillBlock: React.FC<SkillBlockProps> = ({character}) => {
  return (
    <Table>
      <tr>
        <th>Skill</th>
        <th>Bonus</th>
      </tr>
      <tr>
        <td>Acrobatics</td>
        <td>{character.modifiers.acrobatics}</td>
      </tr>
      <tr>
        <td>Animal Handling</td>
        <td>{character.modifiers.animalHandling}</td>
      </tr>
      <tr>
        <td>Arcana</td>
        <td>{character.modifiers.arcana}</td>
      </tr>
      <tr>
        <td>Athletics</td>
        <td>{character.modifiers.athletics}</td>
      </tr>
      <tr>
        <td>Deception</td>
        <td>{character.modifiers.deception}</td>
      </tr>
      <tr>
        <td>History</td>
        <td>{character.modifiers.history}</td>
      </tr>
      <tr>
        <td>Insight</td>
        <td>{character.modifiers.insight}</td>
      </tr>
      <tr>
        <td>Intimidation</td>
        <td>{character.modifiers.intimidation}</td>
      </tr>
      <tr>
        <td>Investigation</td>
        <td>{character.modifiers.investigation}</td>
      </tr>
      <tr>
        <td>Medicine</td>
        <td>{character.modifiers.medicine}</td>
      </tr>
      <tr>
        <td>Nature</td>
        <td>{character.modifiers.nature}</td>
      </tr>
      <tr>
        <td>Perception</td>
        <td>{character.modifiers.perception}</td>
      </tr>
      <tr>
        <td>Performance</td>
        <td>{character.modifiers.performance}</td>
      </tr>
      <tr>
        <td>Persuasion</td>
        <td>{character.modifiers.persuasion}</td>
      </tr>
      <tr>
        <td>Religion</td>
        <td>{character.modifiers.religion}</td>
      </tr>
      <tr>
        <td>Slight of Hand</td>
        <td>{character.modifiers.slightOfHand}</td>
      </tr>
      <tr>
        <td>Stealth</td>
        <td>{character.modifiers.stealth}</td>
      </tr>
      <tr>
        <td>Survival</td>
        <td>{character.modifiers.survival}</td>
      </tr>
    </Table>
  );
};

export default SkillBlock;
