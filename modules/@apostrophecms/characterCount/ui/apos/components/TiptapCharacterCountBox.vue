<template>
  <div v-if="active" v-click-outside-element="cancel" class="apos-popover tiptap-character-count__dialog"
    x-placement="bottom" :class="{
      'apos-is-triggered': active,
      'apos-has-selection': true
    }">
    <AposContextMenuDialog menu-placement="bottom-start">
      <div class="character-count" v-if="editor">
        <h3>Document stats</h3>
        {{ editor.storage.characterCount.characters() }}{{ editorLimitText }} characters
        <br>
        {{ editor.storage.characterCount.words() }} words
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
    editor: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  emits: ['before-commands', 'done', 'cancel'],
  data() {
    return {
      generation: 1,
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
      if (this.moduleOptions?.limit || this.widgetOptions?.limit) {
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

function getOptions() {
  return apos.modules['@apostrophecms/rich-text-widget'];
}
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
.apos-image-control {
  position: relative;
  display: inline-block;
}

.tiptap-character-count__dialog {
  z-index: $z-index-modal;
  position: absolute;
  top: calc(100% + 5px);
  left: -15px;
  opacity: 0;
  pointer-events: none;
}

.apos-context-menu__dialog {
  width: 500px;
}

.apos-image-control__dialog.apos-is-triggered {
  opacity: 1;
  pointer-events: auto;
}

.apos-is-active {
  background-color: var(--a-base-7);
}

.apos-image-control__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.apos-image-control__footer .apos-button__wrapper {
  margin-left: 7.5px;
}

.apos-image-control__remove {
  display: flex;
  justify-content: flex-end;
}

// special schema style for this use
.apos-image-control ::v-deep .apos-field--target {
  .apos-field__label {
    display: none;
  }
}
</style>
