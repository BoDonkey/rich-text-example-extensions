<template>
  <div class="apos-link-control">
    <AposButton
      type="rich-text"
      @click="takeAction"
      :class="{ 'apos-is-active': buttonActive }"
      :label="tool.label"
      :icon-only="!!tool.icon"
      :icon="tool.icon || false"
      :modifiers="['no-border', 'no-motion']"
    />
    <div
      v-if="active"
      v-click-outside-element="close"
      class="apos-popover apos-link-control__dialog"
      x-placement="bottom"
      :class="{
        'apos-is-triggered': active,
        'apos-has-selection': hasSelection
      }"
    >
      <AposContextMenuDialog
        menu-placement="bottom-start"
      >
        <AposSchema
          :schema="schema"
          :trigger-validation="triggerValidation"
          v-model="docFields"
          :utility-rail="false"
          :modifiers="formModifiers"
          :key="lastSelectionTime"
          :generation="generation"
          :following-values="followingValues()"
          :conditional-fields="conditionalFields()"
        />
        <footer class="apos-link-control__footer">
          <AposButton
            type="default" label="apostrophe:cancel"
            @click="close"
            :modifiers="formModifiers"
          />
          <AposButton
            type="primary" label="apostrophe:save"
            @click="save"
            :modifiers="formModifiers"
          />
        </footer>
      </AposContextMenuDialog>
    </div>
  </div>
</template>

<script>
import AposEditorMixin from 'Modules/@apostrophecms/modal/mixins/AposEditorMixin';

export default {
  name: 'TiptapYoutube',
  mixins: [ AposEditorMixin ],
  props: {
    name: {
      type: String,
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
    //const linkWithType = getOptions().linkWithType;
    return {
      generation: 1,
      href: null,
      width: null,
      height: null,
      active: false,
      hasLinkOnOpen: false,
      triggerValidation: false,
      docFields: {
        data: {}
      },
      formModifiers: [ 'small', 'margin-micro' ],
      originalSchema: [
        {
          name: 'src',
          // TODO: i18n
          label: 'YouTub embedded URL',
          type: 'url',
          required: true
        },
        {
          name: 'width',
          lable: 'Width',
          type: 'range',
          min: 320,
          max: 1024,
          step: 1,
          def: 640
        },
        {
          name: 'height',
          lable: 'Height',
          type: 'range',
          min: 180,
          max: 720,
          step: 1,
          def: 360
        }
      ]
    };
  },
  computed: {
    buttonActive() {
      return this.editor.getAttributes('iframe').src || this.active;
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
    schema() {
      return this.originalSchema;
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
    save() {
      this.triggerValidation = true;
      this.$nextTick(() => {
        if (this.docFields.hasErrors) {
          return;
        }
        this.editor.commands.setYoutubeVideo({
          src: this.docFields.data.src,
          width: Math.max(320, parseInt(this.docFields.data.width, 10)) || 640,
          height: Math.max(180, parseInt(this.docFields.data.height, 10)) || 480
        });
        this.close();
      });
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
      try {
        const attrs = this.editor.getAttributes('iframe');
        this.docFields.data = {};
        this.schema.forEach((item) => {
          this.docFields.data[item.name] = attrs[item.name] || '';
        });
      } finally {
        this.generation++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .apos-link-control {
    position: relative;
    display: inline-block;
  }

  .apos-link-control__dialog {
    z-index: $z-index-modal;
    position: absolute;
    top: calc(100% + 5px);
    left: -15px;
    width: 250px;
    opacity: 0;
    pointer-events: none;
  }

  .apos-link-control__dialog.apos-is-triggered.apos-has-selection {
    opacity: 1;
    pointer-events: auto;
  }

  .apos-is-active {
    background-color: var(--a-base-7);
  }

  .apos-link-control__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .apos-link-control__footer .apos-button__wrapper {
    margin-left: 7.5px;
  }

  .apos-link-control__remove {
    display: flex;
    justify-content: flex-end;
  }

  // special schema style for this use
  .apos-link-control ::v-deep .apos-field--target {
    .apos-field__label {
      display: none;
    }
  }

</style>
