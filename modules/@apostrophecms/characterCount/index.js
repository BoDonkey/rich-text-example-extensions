module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    charCountConfig: {}
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
            icon: 'image-icon',
            description: 'Character count',
            component: 'TiptapCharacterCountBox'
        }
      };

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
