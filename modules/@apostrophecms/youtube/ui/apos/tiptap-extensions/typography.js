import Youtube from '@tiptap/extension-youtube';
export default (options) => {
  const configuration = self.apos.modules['@apostrophecms/youtube'].ttYTCongif || {};
  return Youtube.configure(configuration);
};