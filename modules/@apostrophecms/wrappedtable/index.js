module.exports = {
  extend: '@apostrophecms/rich-text-widget',
  options: {
    wrappedTableConfig: ''
  },
  init(self) {
    self.enableBrowserData();
    self.addEditorTools();
  },
  methods(self) {
    return {
      getBrowserData(req) {
        return {
          ttWrappedTableConfig: self.options.wrappedTableConfig
        };
      },
      addEditorTools() {
        self.options.editorTools = {
          ...self.options.editorTools,
          wrappedTable: {
            component: 'AposTiptapTable',
            label: 'Wrapped Table'
          }
        };
      }
    };
  }
};
