const filesInDir = require('files-in-dir');

module.exports = function getJsSourceFiles() {
  const srcJsFiles = filesInDir('src/js', ['js']);
  return Array.isArray(srcJsFiles) ? srcJsFiles : [];
}