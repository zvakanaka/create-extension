#!/usr/bin/env node
const { archive, extension } = require('../index.js');
const argv = require('minimist')(process.argv.slice(2));
const { read } = require('fs-sync-utils');

function init() {
  if (process.argv.length >= 2 + 0) {
    try {
      // args with no '--' or '-' prefix
      const unnamedArgs = argv._;
      const zip = argv.zip || unnamedArgs.includes('zip')
        || argv.archive || unnamedArgs.includes('archive');
      if (zip) {
        archive();
      } else {
        extension();
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error(`Not enough arguments
Usage:
\t${process.argv[1]}`);
  }
}

init();
