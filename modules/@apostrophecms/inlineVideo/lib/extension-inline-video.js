import { Node, nodePasteRule, mergeAttributes } from '@tiptap/core';

const VIMEO_REGEX = /^\/\/player\.vimeo\.com\/video\/(\d+)/;
const VIMEO_REGEX_GLOBAL =/^\/\/player\.vimeo\.com\/video\/(\d+)/g
const YOUTUBE_REGEX = /^\/\/www\.youtube\.com\/embed\/([\w-]{11})/;
const YOUTUBE_REGEX_GLOBAL = /^\/\/www\.youtube\.com\/embed\/([\w-]{11})/g;

const returnValidId = (url) => {
  if (embeddedLink.startsWith('https:') && VIMEO_REGEX.test(embeddedLink)) {
    const vimeoMatch = embeddedLink.match(VIMEO_REGEX);
    return { service: 'Vimeo', id: vimeoMatch[1] };
  } else if (
    embeddedLink.startsWith('https:') &&
    YOUTUBE_REGEX.test(embeddedLink)
  ) {
    const youtubeMatch = embeddedLink.match(YOUTUBE_REGEX);
    return { service: 'YouTube', id: youtubeMatch[1] };
  } else {
    return false;
  }
};

const baseEmbedUrl = (nocookie, service) => {
  if (service === 'YouTube') {
  return nocookie
    ? 'https://www.youtube-nocookie.com/embed/'
    : 'https://www.youtube.com/embed/';
  } else {
    return 'https://player.vimeo.com/video/'
  }
};

const getVideoUrl = (options) => {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    startAt
  } = options;

  const videoId = returnValidId(src)
  if (!videoId) {
    return null;
  }
  let outputUrl = `${baseEmbedUrl(nocookie, videoId.service)}${videoId.id}`;
  const params = [];
  if (videoId.service === 'Vimeo') {
    if (!startAt && autoplay) {
      params.push('autoplay=1')
    } else if (startAt) {
      params.push(`autoplay=1#${startAt}`);
    }
    if (nocookie) {
      params.push('dnt=1');
    }
  } else {
  if (autoplay) {
    params.push('autoplay=1');
  }
  if (startAt) {
    params.push(`start=${startAt}`);
  }
}
  if (ccLanguage) {
    const ccLangParam = (videoId.service === 'YouTube') ? `cc_lang_pref=${ccLanguage}` : `texttrack=${ccLanguage}`;
    params.push(ccLangParam);
  }
  if (ccLoadPolicy && videoId.service === 'YouTube') {
    params.push('cc_load_policy=1');
  }
  if (!controls) {
    params.push('controls=0');
  }
  if (disableKBcontrols) {
    const kbParam = (videoId.service === 'YouTube') ? 'disablekb=1' : 'keyboard=false';
    params.push(kbParam);
  }
  if (enableIFrameApi) {
    if (videoId.service === 'YouTube') params.push('enablejsapi=1');
  }
  if (endTime) {
    if (videoId.service === 'YouTube') params.push(`end=${endTime}`);
  }
  if (interfaceLanguage) {
    if (videoId.service === 'YouTube') params.push(`hl=${interfaceLanguage}`);
  }
  if (ivLoadPolicy) {
    if (videoId.service === 'YouTube') params.push(`iv_load_policy=${ivLoadPolicy}`);
  }
  if (loop) {
    params.push('loop=1');
  }
  if (modestBranding) {
    if (videoId.service === 'YouTube') params.push('modestbranding=1');
  }
  if (origin) {
    if (videoId.service === 'YouTube') params.push(`origin=${origin}`);
  }
  if (progressBarColor) {
    if (videoId.service === 'YouTube') params.push(`color=${progressBarColor}`);
  }

  if (params.length) {
    outputUrl += `?${params.join('&')}`;
  }

  return outputUrl;
};

const Youtube = Node.create({
  name: 'inlinevideo',
  addOptions() {
    return {
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 480,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: '',
      playlist: '',
      progressBarColor: undefined,
      width: 640,
      sizes: 3
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? 'inline' : 'block';
  },
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null
      },
      width: {
        default: this.options.width
      },
      height: {
        default: this.options.height
      },
      allowfullscreen: {
        default: this.options.allowFullscreen
      },
      sizes: {
        default: this.options.sizes
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-inline-video] iframe'
      }
    ];
  },
  addCommands() {
    return {
      setInlineVideo:
        (options) =>
        ({ commands }) => {
          if (!returnValidId(options.src)) {
            return false;
          }
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
    };
  },
  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }
    return [
      nodePasteRule({
        find: YOUTUBE_REGEX_GLOBAL,
        type: this.type,
        getAttributes: (match) => {
          return { src: match.input };
        }
      })
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const embedUrl = getVideoUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0
    });
    HTMLAttributes.src = embedUrl;
    return [
      'div',
      { 'data-inline-video': '' },
      [
        'iframe',
        mergeAttributes(
          this.options.HTMLAttributes,
          {
            width: this.options.width,
            height: this.options.height,
            allowfullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor
          },
          HTMLAttributes
        )
      ]
    ];
  }
});

export { InlineVideo, InlineVideo as default };
//# sourceMappingURL=index.js.map
