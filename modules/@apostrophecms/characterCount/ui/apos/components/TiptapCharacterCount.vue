<template>
  <div class="apos-cc-control">
    <AposButton
      type="rich-text"
      @click="takeAction"
      :class="{ 'apos-is-active': buttonActive }"
      :label="tool.label"
      :modifiers="['no-border', 'no-motion']"
    />
    <div
      v-if="active"
      v-click-outside-element="close"
      class="apos-popover apos-cc-control__dialog" x-placement="bottom"
      :class="{
        'apos-is-triggered': active,
        'apos-has-selection': hasSelection
      }"
    >
      <div class="character-count" v-if="editor">
        <h3>Document stats</h3>
        Total characters: {{ totalCharactersCount }}{{ editorLimitText }} 
        <br>
        Total words: {{ totalWordsCount }}
        <br>
        <div v-if="hasSelection">
          Highlighted characters: {{ highlightedCharacters }}
          <br>
          Highlighted words: {{ highlightedWords }}
        </div>
      </div>
      <footer class="apos-cc-control__footer">
        <AposButton type="primary" label="apostrophe:close" @click="close" :modifiers="formModifiers" />
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TiptapCharacterCount',
  props: {
    options: {
      type: Object,
      required: true
    },
    tool: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      generation: 1,
      active: false,
      triggerValidation: false,
      docFields: {
        data: {}
      },
      formModifiers: ['small', 'margin-micro'],
      totalCharactersCount: 0,
      totalWordsCount: 0,
      highlightedCharacters: 0,
      highlightedWords: 0
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
    buttonActive() {
      return this.active;
    },
    lastSelectionTime() {
      return this.editor.view.lastSelectionTime;
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
    }
  },
  mounted() {
    this.calculateTotalCharacters();
    this.calculateTotalWords();
    this.calculateHighlightedWords();
    this.calculateHighlightedCharacters();
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.calculateTotalCharacters();
        this.calculateTotalWords();
        this.calculateHighlightedWords();
        this.calculateHighlightedCharacters();
        window.addEventListener('keydown', this.keyboardHandler);
      } else {
        window.removeEventListener('keydown', this.keyboardHandler);
      }
    },
  },
  methods: {
    takeAction() {
      this.active = !this.active;
      if (this.active) {
        this.populateFields();
      };
    },
    close() {
      if (this.active) {
        this.active = false;
        this.editor.chain().focus();
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
    },
    calculateHighlightedCharacters() {
      this.highlightedCharacters = this.hasSelection ? this.editor.commands.getHighlightedStats('characters') : 0;
    },
    calculateHighlightedWords() {
      this.highlightedWords = this.hasSelection ? this.editor.commands.getHighlightedStats('words') : 0;
    },
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

.character-count {
  padding: 10px;
  font-size: 12px;
  line-height: 1.5;
}

.apos-cc-control__dialog.apos-is-triggered.apos-has-selection {
  opacity: 1;
  pointer-events: auto;
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
</style>