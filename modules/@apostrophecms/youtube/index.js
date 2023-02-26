module.exports = {
  extend: '@apostrophecms/rich-text-widget',
  options: {
    videoConfig: {}
  },
  init(self) {
    self.enableBrowserData();
    self.addEditorTools();
  },
  methods(self) {
    return {
      getBrowserData(req) {
        return {
          ttYTConfig: self.options.videoConfig
        };
      },
      addEditorTools() {
        self.options.editorTools = {
          ...self.options.editorTools,
          youtube: {
            component: 'TiptapYoutube',
            label: 'Youtube',
            command: 'setYoutubeVideo'
          }
        };
    };
  }
};
