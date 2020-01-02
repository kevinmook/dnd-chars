import React from 'react';
import DiceBlock from '../components/DiceBlock';
import {CharacterData} from '../types';

const slipS8: CharacterData = {
  actions: [
    {
      name: 'Rapier',
      range: '5',
      time: '1A',
      hit: character => ({
        modifier: character.modifiers.dexterity + character.proficiency,
      }),
      damage: character => ({
        d8: 1,
        modifier: character.modifiers.dexterity,
      }),
    },
    {
      name: 'Shortsword',
      range: '5',
      time: '1A',
      hit: character => ({
        modifier: character.modifiers.dexterity + character.proficiency,
      }),
      damage: character => ({
        d6: 1,
        modifier: character.modifiers.dexterity,
      }),
    },
    {
      name: 'Longbow',
      range: '150 (600)',
      time: '1A',
      hit: character => ({
        modifier: character.modifiers.dexterity + character.proficiency + 1,
      }),
      damage: character => ({
        d8: 1,
        modifier: character.modifiers.dexterity + 1,
      }),
    },
    {
      name: 'Sneak attack',
      damage: character => ({
        d6: Math.floor((character.level + 1) / 2),
      }),
      Note: ({action, character}) => <div>Once per turn, you can deal an extra {action.damage && <DiceBlock dice={action.damage(character)} />} damage to one creature you hit with an attack with a finesse or ranged weapon if you have advantage on the attack roll. You don’t need advantage on the attack roll if another enemy of the target is within 5 ft. of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.</div>,
    },
    {
      name: 'Dash, disengage, hide, control hand',
      time: 'BA',
    },
    {
      name: 'Uncanny Dodge',
      range: 'self',
      time: 'RA',
      Note: () => <div>When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack’s damage against you.</div>,
    },
    {
      name: 'Mage Hand',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <p>A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.</p>
          <p>You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.</p>
          <p>The hand can't attack, activate magic items, or carry more than 10 pounds.</p>
          <p>When you cast mage hand, you can make the spectral hand invisible, stow or retrieve objects, or use thieves’ tools to pick locks and disarm traps at range. You can disguise this with a Sleight of Hand check, and you can use the bonus action granted by your Cunning Action to control the hand.',</p>
        </div>
      ),
    },
    {
      name: 'Minor Illusion',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <p>You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.</p>
          <p>If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.</p>
          <p>If you create an image of an object--such as a chair, muddy footprints, or a small chest--it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.</p>
          <p>If a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.</p>
        </div>
      ),
    },
    {
      name: 'Prestidigitation',
      range: '30',
      time: '1A',
      Note: () => (
        <div>
          <p>You create one of the following magical effects within range:</p>
          <ul>
            <li>You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</li>
            <li>You instantaneously light or snuff out a candle, a torch, or a small campfire.</li>
            <li>You instantaneously clean or soil an object no larger than 1 cubic foot.</li>
            <li>You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</li>
            <li>You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.</li>
            <li>You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</li>
          </ul>
          <p>If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.</p>
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
          <p>You make yourself--including your clothing, armor, weapons, and other belongings on your person--look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.</p>
          <p>The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.</p>
          <p>To discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC.</p>
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
          <p>You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.</p>
          <p>You can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.</p>
          <p>Physical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.</p>
        </div>
      ),
    },
    {
      name: 'Charm Person',
      range: '30',
      time: '1A',
      cost: 'spell slot: 1',
      Note: () => (
        <div>
          <p>You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.</p>
          <p>At Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.</p>
        </div>
      ),
    },
    {
      name: 'Find Familiar <R>',
      range: '30',
      time: '1A',
      cost: 'spell slot: 1',
      Note: () => (
        <div>
          <p>While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.</p>
          <p>When you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it.</p>
          <p>Owl: Str: 3 (-4), Dex: 13 (+1), Con: 8 (-1), Int 2 (-4), Wis: 12 (+1); Cha 7 (-2), The owl has advantage on Wisdom (Perception) checks that rely on hearing or sight. Perception: +3, Stealth: +3. AC 11. HP 1</p>
        </div>
      ),
    },
    {
      name: 'Potion of healing (faction)',
      range: '5',
      time: '1A',
      damage: () => ({
        d4: 2,
        modifier: 2,
      }),
    },
    {
      name: 'Greater potion of healing',
      range: '5',
      time: '1A',
      damage: () => ({
        d4: 4,
        modifier: 4,
      }),
    },
  ],
  armorClass: 16,
  level: 6,
  name: 'Phillip (Slip) Slipsilver - S8',
  skills: {
    acrobatics: 'proficient',
    animalHandling: 'basic',
    arcana: 'basic',
    athletics: 'expert',
    deception: 'proficient',
    history: 'basic',
    insight: 'basic',
    intimidation: 'basic',
    investigation: 'basic',
    medicine: 'basic',
    nature: 'basic',
    perception: 'expert',
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
  spellSlots: {
    1: 3,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  },
  stats: {
    strength: 8,
    dexterity: 18,
    constitution: 14,
    intelligence: 10,
    wisdom: 14,
    charisma: 12,
  },
  walkingSpeed: 35,
};

export default slipS8;
