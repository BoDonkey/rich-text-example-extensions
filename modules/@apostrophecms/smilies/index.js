module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    smiliesConfig: {}
  },
  extendMethods(self) {
    return {
      // We need to extend this method so that our configuration data is available
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalData = {
          ...initialData,
          aposSmiliesConfig: self.options.smiliesConfig
        }
        return finalData;
      }
    }
  }
};