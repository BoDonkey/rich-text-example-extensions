// imports our custom extension
import { Smilie } from '../../../lib/smilies.js';
export default (options) => {
  // gets options added in each area
  const perAreaConfig = options.smiliesConfig || {};
  // gets options added at project level to the widget `modules/@apostrophecms/rich-text-widget/index.js`
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposSmiliesConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  // instantiates the extension with our options
  return Smilie.configure(configuration);
};