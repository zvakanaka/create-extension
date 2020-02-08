CLI to create Chrome/Firefox Extensions

# Features
- [x] Inject custom JavaScript onto specific pages at load  
- [x] Access to helper functions (tillTrue, fetchHtml, handleScroll, etc.)
- [x] Each file wrapped in iife  

## Example
[NPM Stats Extension](https://github.com/zvakanaka/npm-stats-extension)

# Usage
`$ npm install --global create-extension`  

`$ mkdir my-extension`

`$ cd my-extension`

Create a JavaScript file (ending in `.js`) in `src/js`. This file(s) will be injected onto any page in your manifest's `content_scripts.matches`.

Build extension in dist:   
`$ ce`

Generate `Archive.zip` with only the essentials needed to run (for Firefox):  
`$ ce zip`

## Local Installation
### Firefox
- `about:debugging` -> "This Firefox" -> "Load Temporary Add-on" -> Select the Archive.zip

### Chrome
- `chrome://extensions` -> Developer Mode (switch on) -> "Load unpacked" (must extract `Archive.zip` first)

# Future Possibilities
- Resources (images etc.)
- CSS file support (working prototype)
