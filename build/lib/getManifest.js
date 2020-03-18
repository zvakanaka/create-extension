const file = require('fs-sync-utils');

module.exports = function getManifest() {
  if (!file.exists('manifest.json')) {
    throw new Error(`Missing 'manifest.json'
  \tExample:

  ${file.read(`${__dirname}/../client/manifest.json`)}
  `)
  }
  const manifest = JSON.parse(file.read('manifest.json'));
  return manifest;
}
