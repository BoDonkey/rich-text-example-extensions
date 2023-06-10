module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    name: '@apostrophecms/characterCount'
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalTools = {
          ...initialData.tools,
          characterCount: {
            component: 'TiptapCharacterCount',
            label: 'CC'
          }
        };

        const finalInsert = {
          ...initialData.insertMenu,
          characterCount: {
            label: 'CC',
            descriptin: 'Character count',
            component: 'TiptapCharacterCountBox'
        }
      };

        const finalData = {
          ...initialData,
          tools: finalTools,
          insertMenu: finalInsert,
          ttCCConfig: self.options.characterConfig
        }
        return finalData;
      }
    }
  }
};
