module.exports = {
  extend: '@apostrophecms/rich-text-widget',
  options: {
    rules: {}
  },
  init(self) {
    self.enableBrowserData();
  },
  methods(self) {
    return {
      getBrowserData(req) {
        return {
          rules: self.options.rules
        };
    }
  }
  
}