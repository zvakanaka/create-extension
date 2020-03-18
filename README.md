CLI to create Chrome/Firefox Extensions

# Features
- [x] Inject custom JavaScript/CSS onto specific pages at load
- [x] Access to helper functions (tillTrue, fetchHtml, handleScroll, etc.)
- [x] Each JS file wrapped in iife

## Example
[NPM Stats Extension](https://github.com/zvakanaka/npm-stats-extension)

# Usage
`$ npm install --save-dev create-extension-cli`

`$ npx ce`

## JavaScript
Create JavaScript file(s) (ending in `.js`) in `src/js`. This file(s) will be injected onto any page in your manifest's `content_scripts.matches`.

## CSS
Create CSS file(s) (ending in `.css`) in `src/css`.


## Build extension
(JS and CSS is output to `dist` directory)

`$ ce`

Generate `Archive.zip` with only the essentials needed to run (for Firefox):

`$ ce zip`

## Loading Your Extension
### Firefox
- `about:debugging` -> "This Firefox" -> "Load Temporary Add-on" -> Select the Archive.zip

### Chrome
- `chrome://extensions` -> Developer Mode (switch on) -> "Load unpacked" (must extract `Archive.zip` first)

# Future Possibilities
- Resources (images etc.)
- Build & download your extension from a website
