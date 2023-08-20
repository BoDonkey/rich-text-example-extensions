module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    typoConfig: {}
  },
  extendMethods(self) {
    return {
      // We need to extend this method so that our configuration data is available
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalData = {
          ...initialData,
          aposTypoConfig: self.options.typoConfig
        }
        return finalData;
      }
    }
  }
};
