import React from 'react';
import {styled} from 'linaria/react';
import DiceBlock from '../components/DiceBlock';
import {CharacterData} from '../types';

const NoteParagraph = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  &:not(:first-child) {
    margin-block-start: 1rem;
  }
`;

const slipS8: CharacterData = {
  actions: [
    {
      name: 'Rapier',
      range: '5',
      time: '1A',
      stat: 'dexterity',
      proficient: true,
      damage: {
        dice: {
          d8: 1,
        },
        type: 'piercing',
      },
    },
    {
      name: 'Shortsword',
      range: '5',
      time: '1A',
      stat: 'dexterity',
      proficient: true,
      damage: {
        dice: {
          d6: 1,
        },
        type: 'piercing',
      },
    },
    {
      name: 'Longbow',
      range: '150 (600)',
      time: '1A',
      stat: 'dexterity',
      proficient: true,
      damage: {
        dice: {
          d8: 1,
        },
        type: 'piercing',
      },
    },
    {
      name: 'Sneak attack',
      Note: ({character}) => <div>Once per turn, you can deal an extra {<DiceBlock dice={{d6: Math.ceil(character.level / 2)}} />} damage to one creature you hit with an attack with a finesse or ranged weapon if you have advantage on the attack roll. You don’t need advantage on the attack roll if another enemy of the target is within 5 ft. of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.</div>,
    },
    {
      name: 'Dash, disengage, hide, control hand',
      time: 'BA',
    },
    {
      name: 'Mage Hand',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <NoteParagraph>A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.</NoteParagraph>
          <NoteParagraph>You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.</NoteParagraph>
          <NoteParagraph>The hand can't attack, activate magic items, or carry more than 10 pounds.</NoteParagraph>
          <NoteParagraph>When you cast mage hand, you can make the spectral hand invisible, stow or retrieve objects, or use thieves’ tools to pick locks and disarm traps at range. You can disguise this with a Sleight of Hand check, and you can use the bonus action granted by your Cunning Action to control the hand.',</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Minor Illusion',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <NoteParagraph>You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.</NoteParagraph>
          <NoteParagraph>If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.</NoteParagraph>
          <NoteParagraph>If you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.</NoteParagraph>
          <NoteParagraph>If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Prestidigitation',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <NoteParagraph>You create one of the following magical effects within range:</NoteParagraph>
          <ul>
            <li>You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</li>
            <li>You instantaneously light or snuff out a candle, a torch, or a small campfire.</li>
            <li>You instantaneously clean or soil an object no larger than 1 cubic foot.</li>
            <li>You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</li>
            <li>You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.</li>
            <li>You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</li>
          </ul>
          <NoteParagraph>If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Disguise Self',
      range: '30',
      time: '1A',
      cost: 'spell slot: 1',
      Note: () => (
        <div>
          <NoteParagraph>You make yourself--including your clothing, armor, weapons, and other belongings on your person--look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.</NoteParagraph>
          <NoteParagraph>The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.</NoteParagraph>
          <NoteParagraph>To discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC.</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Silent Image <C>',
      range: '30',
      time: '1A',
      cost: 'spell slot: 1',
      Note: () => (
        <div>
          <NoteParagraph>You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.</NoteParagraph>
          <NoteParagraph>You can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.</NoteParagraph>
          <NoteParagraph>Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Find Familiar',
      range: '30',
      time: '1A',
      cost: 'spell slot: 1',
      Note: () => (
        <div>
          <NoteParagraph>While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.</NoteParagraph>
          <NoteParagraph>When you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it.</NoteParagraph>
          <NoteParagraph>Owl: Str: 3 (-4), Dex: 13 (+1), Con: 8 (-1), Int 2 (-4), Wis: 12 (+1); Cha 7 (-2), The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight. Perception: +3, Stealth: +3. AC 11. HP 1</NoteParagraph>
        </div>
      ),
    },
    {
      name: 'Potion of healing (faction)',
      range: '5',
      time: '1A',
      Note: () => <div>Heals <DiceBlock dice={{d4: 2, modifier: 2}} /></div>,
    },
  ],
  armorClass: 15,
  classes: {
    rogue: {
      level: 3,
      arcaneTrickster: true,
    },
  },
  feats: {
    elvenAccuracy: false,
  },
  name: 'S9 - Phillip (Slip) Slipsilver',
  proficiencies: {
    acrobatics: 'proficient',
    animalHandling: 'basic',
    arcana: 'basic',
    athletics: 'proficient',
    deception: 'proficient',
    history: 'basic',
    insight: 'basic',
    intimidation: 'basic',
    investigation: 'basic',
    medicine: 'basic',
    nature: 'basic',
    perception: 'proficient',
    performance: 'basic',
    persuasion: 'proficient',
    religion: 'basic',
    slightOfHand: 'expert',
    stealth: 'expert',
    survival: 'basic',
    strength: 'basic',
    dexterity: 'proficient',
    constitution: 'basic',
    intelligence: 'proficient',
    wisdom: 'basic',
    charisma: 'basic',
  },
  stats: {
    strength: 8,
    dexterity: 17,
    constitution: 14,
    intelligence: 10,
    wisdom: 14,
    charisma: 12,
  },
  walkingSpeed: 35,
};

export default slipS8;
