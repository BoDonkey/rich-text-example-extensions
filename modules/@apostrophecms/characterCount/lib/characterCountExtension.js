import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

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

          if (from === to) return 0;

          // Extract text for character count (no extra spaces at node boundaries)
          const textForCharacters = state.doc.textBetween(from, to, null, '');
          const charactersCount = textForCharacters.length;

          // Extract text for word count (with spaces at node boundaries)
          const textForWords = state.doc.textBetween(from, to, ' ', ' ');
          let wordsCount = textForWords
            .split(' ')
            .filter((word) => word !== '').length;

            // if selection has an isolated slash at the end, remove it from the count
          if (/\s\/$/.test(textForWords)) {
            wordsCount--;
          }

          return type === 'characters' ? charactersCount : wordsCount;
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
          let wordCount = 0;
          state.doc.descendants((node) => {
            if (node.isText) {
              const words = node.text.trim().split(/\s+/).filter(Boolean);
              wordCount += words.length;
            }
          });

          const docText = state.doc.textContent;
          const endsWithIsolatedSlash = /\s\/$/.test(docText);

          if (endsWithIsolatedSlash) {
            wordCount = wordCount > 0 ? wordCount - 1 : 0;
          }

          return wordCount;
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
