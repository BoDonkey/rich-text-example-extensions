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

The first extension, `@apostrophecms/typography` adds a whole series of autocomplete actions to your editor. One example, typing `(tm)` will autoconvert to `™`. For a whole list check out the [documentation](https://tiptap.dev/api/extensions/typography). Wow! Cool! Neat! But... why? This extension shows how to take an existing extension, that doesn't require a new button or any other control element, and add it to the rich text editor.

The second extension, `@apostrophecms/smilies` adds a host of keyboard shortcuts for smilie emojis, plus my favorite non-emoji ( `::shrug `, `¯\_(ツ)_/¯`). You can see the full list in [the code](modules/@apostrophecms/smilies/lib/smilies.js). Wow! Cool! Neat! But... isn't there a keyboard shortcut for that now? Yup, but this extension is a great way to learn how to create your own small extension and add it to the rich-text-widget!

The third extension, `@apostrophecms/characterCount` allows you to display how many characters and words you have typed in your editor box. You can also limit the number of characters that can be added through the configuration. Read more about that in the [official documentation](https://tiptap.dev/api/extensions/character-count). Wow... okay, okay. Even I can't get that excited about this one. So, why? This extension will show you how to implement a new button to bring up the character count box.

The fourth extension, `@apostrophecms/inlineVideo` allows you to embed videos from common streaming services without leaving your rich text editor. This is based on the [official Tiptap extension](https://tiptap.dev/api/nodes/youtube) for YouTube and takes the same configuration options. I'll skip the excitement schtick and get directly to the point. This extension is the ultimate in rich-text-widget extension examples. It hits the trifecta of adding a custom extension, with a custom control, and most importantly, adds new markup in the editor. Why is this important? Because everything added to the editor is sanitized. In addition to telling the rich-text-widget that the extension exists, we also have to alter the widget to allow the tags and attributes we are adding.

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install @apostrophecms/blog
```

## Usage

Configure the blog modules in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  // Activate the bundle
  bundles: [ '@apostrophecms/blog' ],
  modules: {
    // The main blog piece type module
    '@apostrophecms/blog': {},
    // The blog page module
    '@apostrophecms/blog-page': {}
  }
});
```

### Enable the page type

To enable the blog page type for editor to select, add it to the `@apostrophecms/page` configuration:

```javascript
// modules/@apostrophecms/page/index.js
module.exports = {
  options: {
    types: [
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      // Adding the blog page type
      {
        name: '@apostrophecms/blog-page',
        label: 'Blog Page'
      }
    ]
  }
};
```

**Note:** The index page template (`index.html`), filters template partial (`filters.html`), and show page template (`show.html`) are primarily meant as a starting point for a project. They demonstrate much of the available template data, but developers will almost always want to override them to implement proper styles and layout.

### Filtering by year, month, and day

The default field `publishedAt` ("Publication Date" in the UI) sets the publication date of the blog post. By default, only articles released in the past are displayed to the user. In the Apostrophe admin UI, all articles are shown to the editors and admin.

> This doesn't mean that Apostrophe will automatically publish a draft update to an existing post on this date. To schedule the publication of new draft content, consider installing the optional [@apostrophecms/scheduled-publishing](https://github.com/apostrophecms/scheduled-publishing) module.

The blog page module, `@apostrophecms/blog-page`, provides query filters to refine blog results by year, month, and day. These are primarily used for index page filters (see the `filters.html` file), but can also be used in REST API requests and server-side queries.

| Filter Name | Description          | Expected Format |
| ----------- | -------------------- | --------------- |
| `year`      | Filter by blog year  | `YYYY`          |
| `month`     | Filter by blog month | `YYYY-MM`       |
| `day`       | Filter by blog day   | `YYYY-MM-DD`    |

### Multiple blog piece types

Sometimes a website needs multiple, distinct types of blog posts. If the blog posts types can be managed together, it might be easiest to [add a new field](https://v3.docs.apostrophecms.org/guide/content-schema.html#using-existing-field-groups) and [query builder](https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#queries-self-query) to customize blog views. But if the blog posts types should be managed completely separately, it may be better to create separate piece types for each.

Just as we [extend `@apostrophecms/piece-type`](https://v3.docs.apostrophecms.org/guide/pieces.html#creating-a-piece-type) to create a new piece type, we can extend `@apostrophecms/blog` to create a new blog post type. The blog post type will need its own module directory and UI labels. It can simply inherit the original fields, and other configuration or override them in the blog type's `index.js` file.

A special blog post type that has a blog URL field might look like this:

```javascript
// modules/special-blog/index.js
module.exports = {
  extend: '@apostrophecms/blog',
  options: {
    label: 'Special blog post',
    pluralLabel: 'Special blog posts'
  },
  fields: {
    add: {
      blogUrl: {
        label: 'blog post URL',
        type: 'url'
      }
    },
    group: {
      basics: { fields: ['blogUrl'] }
    }
  }
};
```

As always with piece-page types and piece types, you must have a module extending @apostrophecms/blog-page that corresponds to each module extending @apostrophecms/blog. Apostrophe will match them up based on the naming convention.

```javascript
// modules/special-blog-page/index.js
module.exports = {
  extend: '@apostrophecms/blog-page'
};
```

Do this as many times as you need custom blog types. Adding filtering and new fields to the base blog module is usually enough for most use cases, but organizations with more complex blog needs will find this strategy helpful.
