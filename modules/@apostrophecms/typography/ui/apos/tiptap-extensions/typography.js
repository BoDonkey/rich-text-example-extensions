import Typography from '@tiptap/extension-typography';
export default (options) => {
  const configuration = self.apos.modules['@apostrophecms/typography'].ttTypoConfig || {};
  return Typography.configure(configuration);
};