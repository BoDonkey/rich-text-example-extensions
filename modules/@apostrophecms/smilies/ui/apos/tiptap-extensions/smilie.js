import { Smilie } from '../../../lib/smilies.js';
export default (options) => {
  return Smilie.extend({
    addOptions() {
      return {
        ...this.parent?.()
      };
    }
  });
};