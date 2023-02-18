import Typography from '@tiptap/extension-typography';
export default (options) => {
  return Typography.extend({
    addOptions() {
      return {
        ...this.parent?.()
      };
    }
  });
};