// imports the tiptap extension from node_modules
import Typography from '@tiptap/extension-typography';
export default (options) => {
  // gets options added in each area
  const perAreaConfig = options.typoConfig || {};
  // gets options added at project level to the widget `modules/@apostrophecms/rich-text-widget/index.js`
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposTypoConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  // instantiates the extension with our options
  return Typography.configure(configuration);
};