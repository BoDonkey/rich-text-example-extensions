module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    typoConfig: {}
  },
  extendMethods(self) {
    return {
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
