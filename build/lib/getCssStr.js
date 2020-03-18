const file = require('fs-sync-utils');
const filesInDir = require('files-in-dir');

module.exports = function getCssStr() {
  if (file.exists('src/css')) {
    const cssFiles = filesInDir('src/css', ['css']);

    const cssStr = cssFiles.reduce((acc, cur, i) => {
      const fileName = `src/css/${cur}`;
      const str = file.read(fileName);

      return `${acc}
/*******************************************************************************
 * CSS source file '${fileName}'
 ******************************************************************************/
${str}`;
    }, '');

    return cssStr;
  }

  return '';
}
