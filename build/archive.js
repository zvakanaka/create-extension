const file = require('fs-sync-utils');
const JSZip = require('jszip');
const fs = require('fs');

module.exports = archive;

/**
 * Create a zipped extension (Firefox needs this)
 */
function archive(archiveFileName = 'Archive.zip') {
  const manifest = file.read('manifest.json');
  const distFile = file.read('dist/content.js');

  const zip = new JSZip();
  zip.file('manifest.json', manifest);
  zip.folder('dist').file('content.js', distFile);

  if (file.exists(archiveFileName)) {
    file.rm(archiveFileName);
  }
  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(archiveFileName))
    .on('finish', () => {
      console.log(`Wrote zip: '${archiveFileName}'`);
    });
}
