import Character from '@tiptap/extension-character-count';
export default (options) => {
  const configuration = self.apos.modules['@apostrophecms/rich-text-widget'].ttCCCongif || {};
  return Character.configure(configuration);
};