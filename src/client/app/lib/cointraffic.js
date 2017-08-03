// @flow

export default function init() {
  onReady(handleReady);
}

/**
 * Run a function when DOM is ready. similar to jQuery's $(document).ready(fn)
 * @param {Function} fn callback
 * @return {void}
 */
function onReady(fn) {
  const isReady = document.attachEvent
    ? document.readyState === 'complete'
    : document.readyState !== 'loading';

  if (isReady) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * When document is ready, load the script.
 * @return {void}
 */
function handleReady() {
  if (!document.head) throw Error('Unexpectedly missing <head>');
  const head: HTMLElement = document.head;
  const s = document.createElement('script');

  s.src = '//apps.cointraffic.io/js/?wkey=3Tnr8t';
  s.async = true;
  s.onerror = handleError;

  head.appendChild(s);
}

/**
 * Error probably means adblock. Check if el exists to make sure.
 * @return {void}
 */
function handleError() {
  if (!document.body) throw Error('Unexpectedly missing <body>');
  const body: HTMLElement = document.body;
  const elAd = document.getElementById('ct_OZvunA');

  if (!elAd) {
    const elMsg = document.createElement('div');

    elMsg.setAttribute('class', 'msg-ab');
    elMsg.innerHTML = getHTML();
    body.appendChild(elMsg);
  }
}

const getHTML = (): string => `
<img src="//i.imgur.com/mie3xJp.png" class="msg-ab-img">
<div class="msg-ab-wrapper">
  <h2 class="msg-ab-title">
    It costs the developer ~$500 per month to run this site.
  </h2>
  <p class="msg-ab-text">
    This footer ad offsets that cost.
    If you like the site, please consider disabling your ad blocker.
  </p>
</div>
`;
