<template>
  <div class="apos-cc-toolbar">
    <AposButton type="rich-text" @click="takeAction" :class="{ 'apos-is-active': buttonActive }" :label="tool.label" :modifiers="['no-border', 'no-motion']" />
    <div v-if="active" v-click-outside-element="close" class="apos-popover apos-cc-toolbar__dialog" x-placement="bottom"
      :class="{
        'apos-is-triggered': active,
        'apos-has-selection': hasSelection
      }">
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
      <footer class="apos-cc-toolbar__footer">
        <AposButton type="primary" label="apostrophe:close" @click="close" :modifiers="formModifiers" />
      </footer>
    </div>
  </div>
</template>

<script>
import characterCountMixin from '../mixins/characterCountMixin';

export default {
  name: 'RichTextCCToolbar',
  mixins: [characterCountMixin],
  props: {
    tool: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      active: false,
      highlightedCharacters: 0,
      highlightedWords: 0
    };
  },
  computed: {
    buttonActive() {
      return this.active;
    }
  },
  mounted() {
    this.calculateHighlightedWords();
    this.calculateHighlightedCharacters();
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.calculateHighlightedWords();
        this.calculateHighlightedCharacters();
      }
    },
  },
  methods: {
    close() {
      if (this.active) {
        this.active = false;
        this.editor.chain().focus();
      }
    },
    takeAction() {
      this.active = !this.active;
      if (this.active) {
        this.populateFields();
      };
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
@import '../scss/characterCountStyles';

.apos-cc-toolbar {
  position: relative;
  display: inline-block;
}

.apos-cc-toolbar__dialog {
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

.apos-cc-toolbar__dialog.apos-is-triggered.apos-has-selection {
  opacity: 1;
  pointer-events: auto;
}

.apos-cc-toolbar__footer {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 10px 0;
}

.apos-cc-toolbar__footer .apos-button__wrapper {
  margin-left: 7.5px;
}

</style>