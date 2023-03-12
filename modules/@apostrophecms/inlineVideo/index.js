module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    inlineVideoConfig: {}
  },
  init(self) {
    self.enableBrowserData();
    self.toolbarToAllowedTags();
    (self.options.editorTools = {
      ...self.options.editorTools,
      inlineVideo: {
        component: 'TiptapInlineVideo',
        // TODO: l18n
        label: 'Inline Video',
        command: 'setInlineVideo'
      }
    }),
      (self.options.tiptapTypes = {
        ...self.options.tiptapTypes,
        inlineVideo: ['iframe', 'div']
      });
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalData = {
          ...initialData,
          ttVideoConfig: self.options.inlineVideoConfig
        };
        return finalData;
      }
    };
  }
};
