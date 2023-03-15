module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    inlineVideoConfig: {}
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
          inlineVideo: {
            component: 'TiptapInlineVideo',
            // TODO: l18n
            label: 'Inline Video',
            command: 'setInlineVideo'
          }
        };
        const finalData = {
          ...initialData,
          ttVideoConfig: self.options.inlineVideoConfig,
          tools: finalTools
        };
        return finalData;
      }
    };
  }
};
