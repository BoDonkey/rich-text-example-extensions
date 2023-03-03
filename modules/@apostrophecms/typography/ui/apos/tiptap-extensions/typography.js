import Typography from '@tiptap/extension-typography';
export default (options) => {
  const configuration = self.apos.modules['@apostrophecms/rich-text-widget'].ttTypoConfig || {};
  return Typography.configure(configuration);
};