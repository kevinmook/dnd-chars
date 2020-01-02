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
        <td>{character.skills.acrobatics}</td>
      </tr>
      <tr>
        <td>Animal Handling</td>
        <td>{character.skills.animalHandling}</td>
      </tr>
      <tr>
        <td>Arcana</td>
        <td>{character.skills.arcana}</td>
      </tr>
      <tr>
        <td>Athletics</td>
        <td>{character.skills.athletics}</td>
      </tr>
      <tr>
        <td>Deception</td>
        <td>{character.skills.deception}</td>
      </tr>
      <tr>
        <td>History</td>
        <td>{character.skills.history}</td>
      </tr>
      <tr>
        <td>Insight</td>
        <td>{character.skills.insight}</td>
      </tr>
      <tr>
        <td>Intimidation</td>
        <td>{character.skills.intimidation}</td>
      </tr>
      <tr>
        <td>Investigation</td>
        <td>{character.skills.investigation}</td>
      </tr>
      <tr>
        <td>Medicine</td>
        <td>{character.skills.medicine}</td>
      </tr>
      <tr>
        <td>Nature</td>
        <td>{character.skills.nature}</td>
      </tr>
      <tr>
        <td>Perception</td>
        <td>{character.skills.perception}</td>
      </tr>
      <tr>
        <td>Performance</td>
        <td>{character.skills.performance}</td>
      </tr>
      <tr>
        <td>Persuasion</td>
        <td>{character.skills.persuasion}</td>
      </tr>
      <tr>
        <td>Religion</td>
        <td>{character.skills.religion}</td>
      </tr>
      <tr>
        <td>Slight of Hand</td>
        <td>{character.skills.slightOfHand}</td>
      </tr>
      <tr>
        <td>Stealth</td>
        <td>{character.skills.stealth}</td>
      </tr>
      <tr>
        <td>Survival</td>
        <td>{character.skills.survival}</td>
      </tr>
    </Table>
  );
};

export default SkillBlock;
