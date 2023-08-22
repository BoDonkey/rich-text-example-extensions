// Extension adapted from the tiptap.dev site examples

// Import the functions we need from tiptap core
import { textInputRule, Extension } from '@tiptap/core';

// Import the list of emojis and regex for each
import replacementEmojis from './replacementEmojis';

const Smilie = Extension.create({
  name: 'smilie',
  addInputRules() {
    const inputRules = [];
    const tone = this.options.tone || 2;
    const convertedEmojis = changeTone(replacementEmojis, tone);
    for (let index = 0; index < convertedEmojis.length; index++) {
      inputRules[index] = textInputRule(convertedEmojis[index]);
    }
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

  const modifier = skinTones[tone - 1];

  // Split the emoji into its individual components
  const components = emoji.split(/(\p{Emoji}|\u{200D})/gu);

  // Modify the components that can have a skin tone modifier
  const modifiedComponents = components.map((component) => {
    if (/\p{Emoji_Modifier_Base}/u.test(component)) {
      // Replace existing modifier or add new one
      const replaced = component.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '');
      return replaced + modifier;
    }
    return component;
  });

  // Reassemble the modified components
  return modifiedComponents.join('');
}

export { Smilie, Smilie as default };