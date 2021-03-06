function timeout(ms) { return new Promise(r => setTimeout(r, ms)); }

/*
 * USAGE:
 * await tillTrue(() => document.querySelector('.thing'));
 */
async function tillTrue(callback, timeout = Infinity) {
  let result = callback();
  const start = Date.now();
  let now = Date.now();
  while (!result && now - start <= timeout) {
    await rafAsync();
    result = callback();
    now = Date.now();
  }
  if (now - start > timeout) throw new Error(`tillTrue timeout, waited longer than ${timeout} miliseconds`);
  return result;
}
function rafAsync() { return new Promise(resolve => requestAnimationFrame(resolve)); }

/*
 * USAGE:
 * document.querySelector('.thing').addEventListener('scroll', e => handleScroll(e, cb));
 */
const SCROLL_DELAY = 100;
let lastScroll = Date.now();
let queuedScroll = false;
function handleScroll(e, callback) {
  const epoch = Date.now();
  if (epoch - lastScroll > SCROLL_DELAY) {
    callback();
    lastScroll = Date.now();
  } else if (!queuedScroll) {
    queuedScroll = true; // lock
    setTimeout(() => { // queue a scroll
      callback();
      lastScroll = Date.now();
      queuedScroll = false;
    }, SCROLL_DELAY);
  }
}

/*
 * USAGE:
 * html`<h1>Hi</h1>`
 */
function html(arr, ...parts) { return arr.reduce((acc, cur, i) => `${acc}${cur}${parts[i] || ''}`, ''); }
function css(arr, ...parts) { return arr.reduce((acc, cur, i) => `${acc}${cur}${parts[i] || ''}`, ''); }

/*
 * USAGE:
 * Same as fetch, but with 3rd param option to use local storage cache (and this returns JSON)
 */
async function fetchJson(url, options, useCache = false) { // cache response and return JSON
  if (useCache) {
    const cached = localStorage.getItem(url);
    if (cached) return JSON.parse(cached);
  }
  localStorage.removeItem(url);
  const data = await fetch(url, options).then(res => res.json());
  if (useCache) localStorage.setItem(url, JSON.stringify(data));
  return data;
}

async function fetchHtml(url, options, useCache = false) { // cache response and return HTML
  if (useCache) {
    const cached = localStorage.getItem(url);
    if (cached) return cached;
  }
  localStorage.removeItem(url);
  const data = await fetch(url, options).then(res => res.text());
  if (useCache) localStorage.setItem(url, data);
  return data;
}

function cleanBody(bodyString) {
  const bodyClean = bodyString
    .replace(/<script/g, '<smcript')
    .replace(/<img /g, '<smimg ')
    .replace(/<iframe/g, '<smiframe')
    .replace(/<style/g, '<smtyle');
  return bodyClean;
}

function applyStyle(str) {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = str;
  document.head.appendChild(styleEl);
}

function appendHtml(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  document.body.appendChild(div);
}
