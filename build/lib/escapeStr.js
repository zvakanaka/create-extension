// escapes ` and $
module.exports = function escapeStr(str) {
  const escapedStr = [
    { regexp: /\`/gm, replacement: '\\`' },
    { regexp: /\$/gm, replacement: '\\$' },
  ].reduce((acc, cur) => {
    return acc.replace(cur.regexp, cur.replacement);
  }, str);

  return escapedStr;
}
