const file = require('fs-sync-utils');
const getJsSourceFiles = require('./getJsSourceFiles');

module.exports = function getJsStr() {
  const srcJsFiles = getJsSourceFiles();
  const jsFiles = [ `${__dirname}/../../client/utils.js`, ...srcJsFiles ];
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
