const file = require('fs-sync-utils');
const filesInDir = require('files-in-dir');

module.exports = extension;

function extension() {
  if (!file.exists('manifest.json')) {
    throw new Error(`Missing 'manifest.json'
  \tExample:

  ${file.read(`${__dirname}/../client/manifest.json`)}
  `)
  }
  const manifest = JSON.parse(file.read('manifest.json'));

  const jsFiles = [ `${__dirname}/../client/utils.js`, ...filesInDir('src/js', ['js']) ];
  const escapedStr = jsFiles.reduce((acc, cur, i) => {
    const fileName = i ? `src/js/${cur}` : cur;
    const str = file.read(fileName);
    const singleFileEscapedStr = [
      { regexp: /\`/gm, replacement: '\\`' },
      { regexp: /\$/gm, replacement: '\\$' },
    ].reduce((acc, cur) => {
      return acc.replace(cur.regexp, cur.replacement);
    }, str);
    const isAsync = singleFileEscapedStr.includes('await ');
    const iife = !!i;
    return `${acc}
  /*******************************************************************************
   * source file '${fileName}'${iife ? ' (wrapped in IIFE)' : ''}
   ******************************************************************************/
  ${iife ? `(${isAsync ? 'async ' : ''}function() {
  ` : ''}${singleFileEscapedStr}${iife ? `
  })();` : ''}`
  }, '');

  if (!file.exists('dist')) {
    file.mkdir('dist');
  }

  file.write('dist/content.js', `console.log('${manifest.name} extension Loaded (v${manifest.version})');
  const script = document.createElement('script');
  script.textContent = \`${escapedStr}\`;
  document.head.append(script);
  `);

  console.log(`${manifest.name} extension created (includes './dist' and 'manifest.json')`);
}
