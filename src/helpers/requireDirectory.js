'use strict';

const fs = require('fs');
const path = require('path');

function requireDirectory(directory) {
  return fs.readdirSync(directory)
    .filter(filename => filename.endsWith('.js'))
    .reduce((modules, filename) => {
      const name = filename.substring(0, filename.length - 3);

      if (name) {
        // eslint-disable-next-line global-require, no-param-reassign, import/no-dynamic-require
        modules[name] = require(path.join(directory, filename));
      }

      return modules;
    }, {});
}

module.exports = requireDirectory;
