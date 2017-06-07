'use strict';

const path = require('path');
const config = require('config');
const sharp = require('sharp');
const request = require('request-promise-native');
const cache = require('./cache');
const requireDirectory = require('../helpers/requireDirectory');

const operations = requireDirectory(path.join(__dirname, './transformations'));

function fetchMetadata(image) {
  return cache.get(image)
    .catch(() => request({ uri: `${config.uploader.imagesEndpoint}/${image}`, json: true })
      .then((metadata) => {
        cache.set(image, metadata);

        return metadata;
      }));
}

function fetchImage(url) {
  return cache.get(url)
    .catch(() => request({ uri: url, encoding: null, gzip: true, resolveWithFullResponse: true })
      .then(({ body }) => {
        cache.set(url, body);

        return body;
      }));
}

function fetch(image) {
  return fetchMetadata(image)
    .then(metadata => fetchImage(metadata.url)
      .then(buffer => ({ buffer, metadata })));
}

function transform({ image, extension, transformations }) {
  return fetch(image)
    .then(({ buffer, metadata }) => {
      let transformed = sharp(buffer);

      transformations.forEach((transformation) => {
        const operation = transformation.operation;

        // eslint-disable-next-line no-prototype-builtins
        if (operations.hasOwnProperty(operation)) {
          transformed = operations[operation]({ image: transformed, params: transformation, metadata });
        }
      });

      return transformed
        .toFormat(extension)
        .toBuffer()
        .then(newImageBuffer => ({ buffer: newImageBuffer, mimetype: extension }));
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}

module.exports = {
  transform,
};
