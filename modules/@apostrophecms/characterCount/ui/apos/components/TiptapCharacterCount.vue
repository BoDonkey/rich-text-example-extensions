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
          {{ editor.storage.characterCount.characters() }}{{ editorLimitText }} characters
          <br>
          {{ editor.storage.characterCount.words() }} words
        </div>
        <footer class="apos-cc-control__footer">
          <AposButton type="primary" label="apostrophe:close" @click="close" :modifiers="formModifiers" />
        </footer>
    </div>
  </div>
</template>

<script>
//import AposEditorMixin from 'Modules/@apostrophecms/modal/mixins/AposEditorMixin';

export default {
  name: 'TiptapCharacterCount',
  //mixins: [AposEditorMixin],
  props: {
    name: {
      type: String,
      required: true
    },
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
      formModifiers: ['small', 'margin-micro']
    };
  },
  computed: {
    moduleOptions() {
      return apos.modules[apos.area.widgetManagers['@apostrophecms/rich-text']].ttCCConfig;
    },
    widgetOptions() {
      return this.options.characterConfig;
    },
    buttonActive() {
      return this.active;
    },
    lastSelectionTime() {
      return this.editor.view.lastSelectionTime;
    },
    hasSelection() {
      const { state } = this.editor;
      const { selection } = this.editor.state;
      const { from, to } = selection;
      const text = state.doc.textBetween(from, to, '');
      return text !== '';
    },
    editorLimitText() {
      if (this.moduleOptions.limit || this.widgetOptions.limit) {
        console.log('this.widgetOptions.limit', this.widgetOptions, this.moduleOptions);
        const limit = this.widgetOptions.limit ? this.widgetOptions.limit : this.moduleOptions.limit;
        return `/${limit}`;
      }
      return '';
    }
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.hasLinkOnOpen = !!(this.docFields.data.src);
        window.addEventListener('keydown', this.keyboardHandler);
      } else {
        window.removeEventListener('keydown', this.keyboardHandler);
      }
    },
    'editor.view.lastSelectionTime': {
      handler(newVal, oldVal) {
        this.populateFields();
      }
    },
    hasSelection(newVal, oldVal) {
      if (!newVal) {
        this.close();
      }
    }
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
      if (e.keyCode === 27) {
        this.close();
      }
      if (e.keyCode === 13) {
        if (this.docFields.data.href || e.metaKey) {
          this.save();
          this.close();
          e.preventDefault();
        } else {
          e.preventDefault();
        }
      }
    },
    async populateFields() {
      this.generation++;
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
