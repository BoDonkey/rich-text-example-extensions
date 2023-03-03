module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    characterConfig: {}
  },
  init(self) {
    self.enableBrowserData();
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

        const finalData = {
          ...initialData,
          tools: finalTools,
          ttCCConfig: self.options.characterConfig
        }
        return finalData;
      }
    }
  }
};
