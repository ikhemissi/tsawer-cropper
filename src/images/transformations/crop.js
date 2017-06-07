'use strict';

function crop({ image, params: { width, height, top, left } }) {
  return image.extract({ width, height, top, left });
}

module.exports = crop;
