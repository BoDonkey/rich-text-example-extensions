<template>
  <div v-if="active" v-click-outside-element="close" class="apos-popover apos-cc-insert__dialog"
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
import characterCountMixin from '../mixins/characterCountMixin';

export default {
  name: 'AposCCInsert',
  mixins: [characterCountMixin],
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      if (this.active) {
        this.$emit('done');
        this.$emit('cancel');
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/characterCountStyles';

.apos-context-menu__dialog {
    width: 500px;
  }

.apos-cc-insert__dialog {
  z-index: $z-index-modal;
  position: absolute;
  top: calc(100% + 5px);
  left: -15px;
  opacity: 1;
  pointer-events: none;
}
</style>