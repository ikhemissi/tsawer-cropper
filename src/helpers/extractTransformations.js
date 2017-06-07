'use strict';

const supportedParameters = {
  w: ['width', Number],
  h: ['height', Number],
  x: ['left', Number],
  y: ['top', Number],
  g: ['gravity'],
  c: ['operation'],
};

function parseTransformation(transformationString) {
  return transformationString.split(',')
    .reduce((transformation, parameter) => {
      // eslint-disable-next-line no-unused-vars
      const [_, key, value] = parameter.match(/([a-z]+)_([a-z0-9_.]*)/);

      if (supportedParameters[key]) {
        const [param, castingFunction] = supportedParameters[key];

        // eslint-disable-next-line no-param-reassign
        transformation[param] = typeof castingFunction === 'function' ? castingFunction(value) : value;
      }

      return transformation;
    }, {});
}

function extractTransformations(transformationsString) {
  let transformations = [];

  if (transformationsString) {
    transformations = transformationsString
      .split('/')
      .filter(part => !!part)
      .map(parseTransformation);
  }

  return transformations;
}

module.exports = extractTransformations;
