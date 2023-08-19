import CharacterCount from '../../../lib/characterCountExtension';
export default (options) => {
  const perAreaConfig = options.charCountConfig || {};
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposCharCountConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  return CharacterCount.configure(configuration);
};