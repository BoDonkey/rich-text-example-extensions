<template>
  <div v-if="active" v-click-outside-element="close" class="apos-popover tiptap-character-count__dialog"
    x-placement="bottom" :class="{
      'apos-is-triggered': active,
      'apos-has-selection': hasSelection
    }">
    <AposContextMenuDialog menu-placement="bottom-start">
      <div class="character-count" v-if="editor">
        <h3>Document stats</h3>
        Total characters: {{ totalCharactersCount }}{{ editorLimitText }} 
        <br>
        Total words: {{ totalWordsCount }}
      </div>
      <footer class="apos-cc-control__footer">
        <AposButton type="primary" label="apostrophe:close" @click="close" :modifiers="formModifiers" />
      </footer>
    </AposContextMenuDialog>
  </div>
</template>

<script>
export default {
  name: 'TiptapCharacterCountBox',
  props: {
    options: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  emits: ['cancel'],
  data() {
    return {
      generation: 1,
      triggerValidation: false,
      docFields: {
        data: {}
      },
      formModifiers: ['small', 'margin-micro'],
      totalCharactersCount: 0,
      totalWordsCount: 0
    };
  },
  computed: {
    moduleOptions() {
      return apos.modules[apos.area.widgetManagers['@apostrophecms/rich-text']].aposCharCountConfig;
    },
    widgetOptions() {
      if (this.options?.charCountConfig) {
        return this.options.charCountConfig;
      }
      return {};
    },
    editorLimitText() {
      if (this.moduleOptions?.limit || this.widgetOptions?.limit) {
        const limit = this.widgetOptions.limit ? this.widgetOptions.limit : this.moduleOptions.limit;
        return `/${limit}`;
      }
      return '';
    },
    hasSelection() {
      const { state } = this.editor;
      const { selection } = this.editor.state;
      const { from, to } = selection;
      const text = state.doc.textBetween(from, to, '');
      return text !== '';
    },
    highlightedCharacters() {
      return this.hasSelection ? this.editor.commands.getHighlightedStats('characters') : 0;
    },
    highlightedWords() {
      return this.hasSelection ? this.editor.commands.getHighlightedStats('words') : 0;
    }
  },
  mounted() {
    this.calculateTotalCharacters();
    this.calculateTotalWords();
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.calculateTotalCharacters();
        this.calculateTotalWords();
        window.addEventListener('keydown', this.keyboardHandler);
      } else {
        window.removeEventListener('keydown', this.keyboardHandler);
      }
    },
  },
  methods: {
    close() {
      if (this.active) {
        this.$emit('done');
        this.$emit('cancel');
      }
    },
    keyboardHandler(e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        this.close();
        e.preventDefault();
      }
    },
    async populateFields() {
      this.generation++;
    },
    calculateTotalCharacters() {
      this.totalCharactersCount = this.editor.commands.getTotalCharactersCount();
    },
    calculateTotalWords() {
      this.totalWordsCount = this.editor.commands.getTotalWordsCount();
    }
  }
};
</script>

<style lang="scss" scoped>
.apos-cc-control {
  position: relative;
  display: inline-block;
}

.apos-cc-control__dialog {
  z-index: $z-index-modal;
  position: absolute;
  top: calc(100% + 5px);
  left: -15px;
  width: 250px;
  opacity: 1;
  pointer-events: none;
  border: 1px solid var(--a-base-3);
  border-radius: 3px;
  background-color: white;
}

.apos-context-menu__dialog {
    width: 500px;
  }

.character-count {
  padding: 10px;
  font-size: 12px;
  line-height: 1.5;
}


.apos-is-active {
  background-color: var(--a-base-7);
}

.apos-cc-control__footer {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 10px 0;
}

.apos-cc-control__footer .apos-button__wrapper {
  margin-left: 7.5px;
}


.tiptap-character-count__dialog {
  z-index: $z-index-modal;
  position: absolute;
  top: calc(100% + 5px);
  left: -15px;
  opacity: 1;
  pointer-events: none;
}


.apos-context-menu__dialog {
  width: 500px;
}

</style>