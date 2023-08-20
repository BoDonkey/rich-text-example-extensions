<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>Apostrophe Typography Extensions</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20Apostrophe%203-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="Join the community on Discord" href="http://chat.apostrophecms.org">
      <img alt="" src="https://img.shields.io/discord/517772094482677790?color=5865f2&label=Join%20the%20Discord&logo=discord&logoColor=fff&labelColor=000&style=for-the-badge&logoWidth=20">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/blog/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

This module bundle adds three new extensions to the `@apostrophecms/rich-text-widget`. While you may find these new extensions useful, they are also a great learning resource and the basis for a series of upcoming tutorials.

The first extension, `@apostrophecms/typography` adds a whole series of autocomplete actions to your editor. One example, typing `(tm)` will autoconvert to `™`. For a whole list check out the [documentation](https://tiptap.dev/api/extensions/typography). Note that some auto-convert rules (like fractions) won't work if you have the insert menu turned on. You can configure this module either at the project level in the `modules/@apostrophecms/rich-text-editor/index.js` file, or in the configuration section for the rich-text-widget of individual areas.
Example:
```js
widgets: {
  '@apostrophecms/rich-text': {
    insert: [
      ...
    ],
    toolbar: [
      ...
    ],
    styles: [
      ...
    ],
    typoConfig: {
      // No longer will convert `(tm)` to ™
      trademark: false,
      // Will convert `->` to `=>`
      rightArrow: '=>'
    }
  },
  '@apostrophecms/image': {},
  '@apostrophecms/video': {}
}
```

Wow! Cool! Neat! But... why? Because this extension shows how to take an existing tiptap extension, that doesn't require a new button or any other control element, and add it to the rich text editor.

The second extension, `@apostrophecms/smilies` adds a host of keyboard shortcuts for smilie emojis, plus my favorite non-emoji ( `:ashrug `, `¯\_(ツ)_/¯`). You can see the full list in [the code](modules/@apostrophecms/smilies/lib/smilies.js). Wow! Cool! Neat! But... isn't there a keyboard shortcut for that now? Yup, but this extension is a great way to learn how to create your own small tiptap extension and add it to the rich-text-widget!

The third extension, `@apostrophecms/characterCount` allows you to display how many characters and words you have typed in your editor box. You can either open the box from the toolbar or the insert menu. If you add it to the toolbar, it will also tell you how many characters you have highlighted. You can limit the number of characters that can be added to the editor box through the configuration.

```js
widgets: {
  '@apostrophecms/rich-text': {
    insert: [
      'table',
      'image',
      // add here to have it appear on the insert menu
      'characterCount'
    ],
    toolbar: [
      ...
    ],
    styles: [
      ...
    ],
    charCountConfig: {
      // How X!
      limit: 280
    }
  },
  '@apostrophecms/image': {},
  '@apostrophecms/video': {}
}
```

Wow... okay, okay. Even I can't get that excited about this one. So, why? This extension will show you how to implement a new button on the toolbar or item in the insert menu to bring up the character count box. It will also give you a basic overview of how you would implement the Vue components for each.

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install @apostrophecms/rich-text-extension
```

## Usage

Configure the blog modules in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  // Activate the bundle
  bundles: [ '@apostrophecms/rich-text-extension' ],
  modules: {
    // The typography module
    '@apostrophecms/typography': {},
    // The smilies module
    '@apostrophecms/smilies': {},
    // The character count module
    '@apostrophecms/characterCount': {}
  }
});
```

Enabling any of these modules will improve the rich-text-widget, making them available without additional configurations. You will only need to add the `characterCount` to the insert menu if you want it to appear there in addition to on the toolbar.