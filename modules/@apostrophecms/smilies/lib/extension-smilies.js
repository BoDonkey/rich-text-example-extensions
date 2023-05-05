import { textInputRule, Extension } from '@tiptap/core';

const replacementEmojis = [
  { find: /-___- $/, replace: '😑 '},
  { find: /:-?\)$/, replace: '😊' },
  { find: /:-?\($/, replace: '😞' },
  { find: /;-?\)$/, replace: '😉' },
  { find: /:-?D$/, replace: '😀' },
  { find: /:-?[Oo]$/, replace: '😲' },
  { find: /:-?P$/, replace: '😛' },
  { find: /:-?\|$/, replace: '😐' },
  { find: /:-?\/$/, replace: '😕' },
  { find: /;-?\($/, replace: '😢' },
  { find: /:\'-?\($/, replace: '😢' },
  { find: /:-?\'\)$/, replace: '😂' },
  { find: /:-?\*$/, replace: '😘' },
  { find: /<3$/, replace: '❤️' },
  { find: /:-?\$$/, replace: '🤑' },
  { find: /:-?S$/, replace: '😬' },
  { find: /:-?@$/, replace: '🤬' },
  { find: /:-?\($/, replace: '😔' },
  { find: /:-?\\$$/, replace: '😒' },
  { find: /:-?\*$/, replace: '😘' },
  { find: /:-?\/$/, replace: '😕' },
  { find: /8-?\)$/, replace: '😎' },
  { find: /B-?D$/, replace: '🤓' },
  { find: /<[/\\]3$/, replace: '💔' },
  { find: /<:)$/, replace: '💡' },
  { find: /:-{}<-<$/, replace: '🌈' },
  { find: /:[3]$/, replace: '😺' },
{ find: /=\^_[\^~]*=$/, replace: '😸' },
{ find: /;[D]|[=o]['`]?[.]?[oO\\-]*[><]$/, replace: '😹' },
{ find: /:[*]|[>o][_.]*[<o\\-]*[>o]?$/, replace: '😻' },
{ find: /:[x]|[=].?[_.]?[=\\-][^.]$/, replace: '😼' },
{ find: /:[c]|[=].?[_.]?[=\\-][^oO\\-]$/, replace: '😽' },
{ find: /\)__\(\\$/, replace: '🐴' },
{ find: /<__,,,\^>$/, replace: '🐎' },
{ find: /<\\___\/>>$/, replace: '🦄' },
{ find: /\/shrug $/, replace: '¯\\_(ツ)_/¯'},
];

const inputRules = [];


for (let index = 0; index < replacementEmojis.length; index++) {
  inputRules[index] = textInputRule(replacementEmojis[index]);
}

const Smilie = Extension.create({
  name: 'smilie',
  addInputRules() {
    return inputRules;
  },
});

export { Smilie, Smilie as default };
