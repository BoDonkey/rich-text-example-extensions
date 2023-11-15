export default {
  data() {
    return {
      generation: 1,
      // triggerValidation: false,
      formModifiers: ['small', 'margin-micro'],
      totalCharactersCount: 0,
      totalWordsCount: 0
    };
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  },
  computed: {
    moduleOptions() {
      return apos.modules[apos.area.widgetManagers['@apostrophecms/rich-text']]
        .aposCharCountConfig;
    },
    widgetOptions() {
      if (this.options?.charCountConfig) {
        return this.options.charCountConfig;
      }
      return {};
    },
    editorLimitText() {
      if (this.moduleOptions?.limit || this.widgetOptions?.limit) {
        const limit = this.widgetOptions.limit
          ? this.widgetOptions.limit
          : this.moduleOptions.limit;
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
