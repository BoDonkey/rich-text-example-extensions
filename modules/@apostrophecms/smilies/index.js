module.exports = {
  improve: '@apostrophecms/rich-text-widget',
  options: {
    smilieConfig: {}
  },
  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const initialData = _super(req);
        const finalData = {
          ...initialData,
          aposSmilieConfig: self.options.smilieConfig
        }
        return finalData;
      }
    }
  }
}