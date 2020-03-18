const file = require('fs-sync-utils');
const filesInDir = require('files-in-dir');

module.exports = function getJsStr() {
  const jsFiles = [ `${__dirname}/../../client/utils.js`, ...filesInDir('src/js', ['js']) ];
  const jsStr = jsFiles.reduce((acc, cur, i) => {
    const fileName = i ? `src/js/${cur}` : cur;
    const displayedFileName = i ? `'${fileName}'` : `'utils.js' (helper from create-extension)`;
    const str = file.read(fileName);
    const isAsync = str.includes('await ');
    const iife = !!i;
    return `${acc}
/*******************************************************************************
 * JS source file ${displayedFileName}${iife ? ' (wrapped in IIFE)' : ''}
 ******************************************************************************/
${iife ? `(${isAsync ? 'async ' : ''}function() {
` : ''}${str}${iife ? `
})();` : ''}`
  }, '');

  return jsStr;
}
