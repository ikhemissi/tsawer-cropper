'use strict';

const ms = require('ms');
const lruCache = require('lru-cache');

const cache = lruCache({
  length: buffer => buffer.length, // Image/Buffer size in bytes
  max: 100 * 1024 * 1024, // 100Mb cache
  maxAge: ms('30m'), // We cache images for a maximum of 30 minutes
});

function set(key, value) {
  cache.set(key, value);
}

function get(key) {
  const value = cache.get(key);

  return value ? Promise.resolve(value) : Promise.reject();
}

module.exports = {
  set,
  get,
};
