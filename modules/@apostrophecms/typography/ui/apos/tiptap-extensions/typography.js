import Typography from '@tiptap/extension-typography';
export default (options) => {
  const perAreaConfig = options.typographyConfig || {};
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposTypoConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  return Typography.configure(configuration);
};