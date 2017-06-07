'use strict';

function scale({ image, params: { width, height } }) {
  return image.resize(width, height);
}

module.exports = scale;
