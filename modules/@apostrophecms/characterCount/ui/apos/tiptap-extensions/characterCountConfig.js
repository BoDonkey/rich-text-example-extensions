// imports our custom extension
import CharacterCount from '../../../lib/characterCountExtension';
export default (options) => {
  // gets options added in each area
  const perAreaConfig = options.charCountConfig || {};
  // gets options added at project level to the widget `modules/@apostrophecms/rich-text-widget/index.js`
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposCharCountConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  // instantiates the extension with our options
  return CharacterCount.configure(configuration);
};