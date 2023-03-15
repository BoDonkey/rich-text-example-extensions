import { InlineVideo } from '../../../lib/extension-inline-video';
export default (options) => {
  const configuration = self.apos.modules['@apostrophecms/rich-text-widget'].ttVideoConfig || {};
  return InlineVideo.configure(configuration);
};