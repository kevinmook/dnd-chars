import React from 'react';
import {FullCharacterData} from '../../types';
import Table, {CenteredCell} from '../Table';

type SkillTableProps = {
  character: FullCharacterData;
};


const SkillRow: React.FC<{name: string, skill: keyof FullCharacterData['skills'], character: FullCharacterData}> = ({name, skill, character}) => {
  const skillValue = character.skills[skill];
  let proficiencyStars = '';
  if (character.proficiencies[skill] === 'proficient') {
    proficiencyStars = '*';
  } else if (character.proficiencies[skill] === 'expert') {
    proficiencyStars = '**';
  }

  return (
    <tr>
      <td>{name}{proficiencyStars}</td>
      <CenteredCell>{skillValue}</CenteredCell>
    </tr>
  );
};

const SkillTable: React.FC<SkillTableProps> = ({character}) => (
  <Table>
    <thead>
      <tr>
        <th>Skill</th>
        <th>Bonus</th>
      </tr>
    </thead>
    <tbody>
      <SkillRow name="Acrobatics" skill="acrobatics" character={character} />
      <SkillRow name="Animal Handling" skill="animalHandling" character={character} />
      <SkillRow name="Arcana" skill="arcana" character={character} />
      <SkillRow name="Athletics" skill="athletics" character={character} />
      <SkillRow name="Deception" skill="deception" character={character} />
      <SkillRow name="History" skill="history" character={character} />
      <SkillRow name="Insight" skill="insight" character={character} />
      <SkillRow name="Intimidation" skill="intimidation" character={character} />
      <SkillRow name="Investigation" skill="investigation" character={character} />
      <SkillRow name="Medicine" skill="medicine" character={character} />
      <SkillRow name="Nature" skill="nature" character={character} />
      <SkillRow name="Perception" skill="perception" character={character} />
      <SkillRow name="Performance" skill="performance" character={character} />
      <SkillRow name="Persuasion" skill="persuasion" character={character} />
      <SkillRow name="Religion" skill="religion" character={character} />
      <SkillRow name="Slight of Hand" skill="slightOfHand" character={character} />
      <SkillRow name="Stealth" skill="stealth" character={character} />
      <SkillRow name="Survival" skill="survival" character={character} />
    </tbody>
  </Table>
);

export default SkillTable;
