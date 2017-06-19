/**
 * This script will import the latesst etherdelta config file which contains
 * the list of currency pairs hard-coded.
 */
const path = require('path');
const fs = require('fs');
const fetch = require('isomorphic-fetch');

const url = 'https://raw.githubusercontent.com/etherdelta/etherdelta.github.io/master/config.js';
const savePath = path.join(__dirname, '../src/shared/lib/etherdelta.config.js');

fetch(url).then(res => res.text()).then((text) => {
  if (text) {
    fs.writeFile(savePath, text, () => process.exit(0));
  }
});
