const fs = require('fs');

// Read the original file
const data = fs.readFileSync('emoji_mapping.txt', 'utf-8');
console.log(data);

// Define the regular expression
const emojiRegex = /replace: '([^']*)'/g;

// Replace each match in the data
const updatedData = data.replace(emojiRegex, (match, emoji) => {
  // Convert the emoji to Unicode
  const unicode = Array.from(emoji, char => char.codePointAt(0).toString(16)).join('');
  // Return the original match, but with the emoji replaced by the Unicode
  return match.replace(emoji, `\\u{${unicode}}`);
});

// Write the updated data back to the file
fs.writeFileSync('updated_emoji_mapping.js', updatedData);
