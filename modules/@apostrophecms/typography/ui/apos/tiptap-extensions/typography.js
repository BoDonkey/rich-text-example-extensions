import Typography from '@tiptap/extension-typography';
export default (options) => {
  const rules = options.rules || {};
  return Typography.configure(rules);
};