// Extension adapted from the tiptap.dev site examples

// Import the functions we need from tiptap core
import { textInputRule, Extension } from '@tiptap/core';

// Import the list of emojis and regex for each
import replacementEmojis from './replacementEmojis';

const inputRules = [];
const tone = 2;

const convertedEmojis = changeTone(replacementEmojis, tone);

for (let index = 0; index < convertedEmojis.length; index++) {
  inputRules[index] = textInputRule(convertedEmojis[index]);
}

const Smilie = Extension.create({
  name: 'smilie',
  addInputRules() {
    return inputRules;
  },
});

function changeTone(replacementEmojis, tone) {
  return replacementEmojis.map(item => ({
    find: item.find,
    replace: changeSkinTone(item.replace, tone),
  }));
}

function changeSkinTone(emoji, tone) {
  const skinTones = [
    '\u{1F3FB}', // Light skin tone
    '\u{1F3FC}', // Medium-light skin tone
    '\u{1F3FD}', // Medium skin tone
    '\u{1F3FE}', // Medium-dark skin tone
    '\u{1F3FF}', // Dark skin tone
  ];

  // Function to apply skin tone to a single emoji component
  const applySkinTone = (component) => {
    if (/\p{Emoji_Modifier_Base}/u.test(component)) {
      const baseEmoji = component.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '');
      return baseEmoji + skinTones[tone - 1];
    }
    return component;
  };

  // Split the emoji into its individual components
  const components = emoji.split(/(\u{200D})/u);

  // Change the skin tone of each component that supports it
  const modifiedComponents = components.map(applySkinTone);

  // Reassemble the modified components
  return modifiedComponents.join('');
}

export { Smilie, Smilie as default };
