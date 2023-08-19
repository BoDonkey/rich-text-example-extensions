import { Extension } from '@tiptap/core';
import { Plugin, TextSelection, PluginKey } from '@tiptap/pm/state';

const CharacterCount = Extension.create({
  name: 'characterCount',

  addOptions() {
    return {
      limit: null
    };
  },

  addCommands() {
    return {
      getHighlightedStats:
        (type = 'characters') =>
        ({ state }) => {
          const { from, to } = state.selection;

          if (from === to) return { characters: 0, words: 0 };

          const slice = state.doc.slice(from, to);

          const charactersCount = slice.content.content.reduce(
            (count, node) => {
              return count + node.textContent.length;
            },
            0
          );

          const wordsCount = slice.content.content.reduce((count, node) => {
            return count + node.textContent.split(' ').length;
          }, 0);

          const lastCharacterIsSlash =
            slice.content.lastChild.textContent.endsWith('/');
          if (lastCharacterIsSlash) {
            charactersCount--;
            if (
              slice.content.lastChild.textContent.split(' ').slice(-1)[0] ===
              '/'
            ) {
              wordsCount--;
            }
          }

          if (type === 'characters') {
            return charactersCount;
          } else if (type === 'words') {
            return wordsCount;
          }
        },
      getTotalCharactersCount:
        () =>
        ({ state }) => {
          const text = state.doc.textContent;
          return text[text.length - 1] === '/' ? text.length - 1 : text.length;
        },
      getTotalWordsCount:
        () =>
        ({ state }) => {
          const text = state.doc.textContent;

          return text.split(' ').reduce((count, word, index, array) => {
            if (word === '/' && index === array.length - 1) {
              return count - 1;
            }
            return count + 1;
          }, 0);
        }
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('characterCount'),
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;
          if (
            !transaction.docChanged ||
            limit === 0 ||
            limit === null ||
            limit === undefined
          ) {
            return true;
          }

          // Check if the transaction is a paste operation
          const isPaste = transaction.getMeta('paste');

          // Get the total characters count from the new state
          const totalCharacters = transaction.doc.textContent.length;

          // If the total number of characters exceeds the limit, rollback the transaction
          if (totalCharacters > limit) {
            if (isPaste) {
              // For pasted content, try to remove the exceeding content
              const over = totalCharacters - limit;
              const pos = transaction.selection.$head.pos;
              const from = pos - over;
              const to = pos;
              transaction.deleteRange(from, to);
            } else {
              // If the limit will be exceeded, block the transaction
              return false;
            }
          }

          // Allow the transaction if within the limit
          return true;
        }
      })
    ];
  }
});

export default CharacterCount;
