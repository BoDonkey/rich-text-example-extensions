module.exports = {
  bundle: {
    directory: 'modules',
    modules: [ `@apostrophecms/typography`, '@apostrophecms/smilies' ]
  }
  init(self) {
    console.log('👋 from the rich text widget extension!');
  }
}