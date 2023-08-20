module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    charCountConfig: {}
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);
        // This adds the character count to the toolbar
        const finalTools = {
          ...initialData.tools,
          characterCount: {
            component: 'TiptapCharacterCount',
            label: 'CC'
          }
        };

        // This makes the character count available to be added to the insert menu
        const finalInsert = {
          ...initialData.insertMenu,
          characterCount: {
            label: 'CC',
            icon: 'eye-icon',
            description: 'Character count',
            component: 'TiptapCharacterCountBox'
        }
      };

      // Also adds in the configuration options
        const finalData = {
          ...initialData,
          tools: finalTools,
          insertMenu: finalInsert,
          aposCharCountConfig: self.options.charCountConfig
        }
        return finalData;
      }
    }
  }
};
