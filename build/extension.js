const file = require('fs-sync-utils');
const manifest = require('./lib/getManifest')();
const getJsSourceFiles = require('./lib/getJsSourceFiles');
const getCssSourceFiles = require('./lib/getCssSourceFiles');
const jsStr = require('./lib/getJsStr')();
const cssStr = require('./lib/getCssStr')();
const escapeStr = require('./lib/escapeStr');

module.exports = extension;

function extension() {
  if (!file.exists('dist')) {
    file.mkdir('dist');
  }

  const injectedJs = getJsSourceFiles().length > 0 && jsStr ? `
// JavaScript
const script = document.createElement('script');
script.textContent = \`${escapeStr(jsStr)}\`;
document.head.append(script);
` : '';

  const injectedCss =  getCssSourceFiles().length > 0 && cssStr ? `
// CSS
const style = document.createElement('style');
style.textContent = \`${escapeStr(cssStr)}\`;
document.head.appendChild(style);
` : '';

  file.write('dist/content.js', `console.log('${manifest.name} extension loaded (v${manifest.version})');
${injectedJs}${injectedCss}`);

  console.log(`${manifest.name} extension created (includes './dist' and 'manifest.json')`);
}
