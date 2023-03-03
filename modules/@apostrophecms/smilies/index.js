module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    smilieConfig: {}
  },
  init(self) {
    self.enableBrowserData();
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalData = {
          ...initialData,
          ttSmilieConfig: self.options.smilieConfig
        }
        return finalData;
      }
    }
  }
}