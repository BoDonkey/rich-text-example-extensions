// Extension adapted from the tiptap.dev site examples

// Import the functions we need from tiptap core
import { textInputRule, Extension } from '@tiptap/core';

// Import a helper library for the emoji skin tones
import emojiRegex from 'emoji-regex';

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

  const regex = emojiRegex();

  return emoji.replace(regex, (match) => {
    if (modifiableEmojiUnicode.includes(match)) {
      return match + skinTones[tone - 1];
    }
    return match;
  });
}

export { Smilie, Smilie as default };
