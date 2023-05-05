import Character from '@tiptap/extension-character-count';
export default (options) => {
  const perAreaConfig = options.characterConfig || {};
  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].ttCCConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);
  return Character.configure(configuration);
};