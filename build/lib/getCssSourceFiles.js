const filesInDir = require('files-in-dir');

module.exports = function getCssSourceFiles() {
  const srcCssFiles = filesInDir('src/css', ['css']);
  return Array.isArray(srcCssFiles) ? srcCssFiles : [];
}