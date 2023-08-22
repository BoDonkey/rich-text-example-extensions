// Extension adapted from the tiptap.dev site examples

// Import the functions we need from tiptap core
import { textInputRule, Extension } from '@tiptap/core';

// Import the list of emojis and regex for each
import replacementEmojis from './replacementEmojis';

const inputRules = [];
const tone = 5;

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
  const modifiableEmojis = [0x26F9, 0x270A, 0x270B, 0x270C, 0x270D, 0x1F385, 0x1F3C2, 0x1F3C3, 0x1F3C4, 0x1F3C7, 0x1F3CA, 0x1F3CB, 0x1F3CC, 0x1F442, 0x1F443, 0x1F446, 0x1F447, 0x1F448, 0x1F449, 0x1F450, 0x1F466, 0x1F467, 0x1F468, 0x1F469, 0x1F46E, 0x1F470, 0x1F471, 0x1F472, 0x1F473, 0x1F474, 0x1F475, 0x1F476, 0x1F477, 0x1F478, 0x1F47C, 0x1F481, 0x1F482, 0x1F483, 0x1F485, 0x1F486, 0x1F487, 0x1F4AA, 0x1F574, 0x1F575, 0x1F57A, 0x1F590, 0x1F595, 0x1F596, 0x1F645, 0x1F646, 0x1F64B, 0x1F64C, 0x1F64D, 0x1F64E, 0x1F64F, 0x1F6A3, 0x1F6B4, 0x1F6B5, 0x1F6B6, 0x1F6C0, 0x1F6CC, 0x1F918, 0x1F919, 0x1F91A, 0x1F91B, 0x1F91C, 0x1F91E, 0x1F926, 0x1F930, 0x1F933, 0x1F934, 0x1F935, 0x1F936, 0x1F937, 0x1F938, 0x1F939, 0x1F93D, 0x1F93E];
  const modifiableEmojiUnicode = modifiableEmojis.map(code => String.fromCodePoint(code));
  const skinTones = [
    '\u{1F3FB}', '\u{1F3FC}', '\u{1F3FD}', '\u{1F3FE}', '\u{1F3FF}',
  ];

  const applySkinTone = (component) => {
    if (modifiableEmojiUnicode.includes(component)) {
      console.log('in if', component);
      return component + skinTones[tone - 1];
    }
    console.log('in else', component);
    return component;
  };

  // Split the emoji into its individual components using a regular expression that matches emoji characters
  const components = Array.from(emoji.split(/(\p{Emoji}|\u{200D})/gu));
  console.log('components', emoji, components);
  const modifiedComponents = components.map(([component]) => applySkinTone(component));

  return modifiedComponents.join('');
}

export { Smilie, Smilie as default };
