'use strict';

const express = require('express');
const images = require('../images');
const extractTransformations = require('../helpers/extractTransformations');

const router = express.Router();

// Accept queries specifying an image, an output format, and a list of transformations
// e.g. /x_355,y_410,w_300,h_200,c_crop/w_150,h_100,c_scale/<imageId>.jpg
router.get(/^(\/.+)?\/(.+)\.(\w{3,4})$/, (req, res) => {
  const transformations = extractTransformations(req.params[0]);
  const image = req.params[1];
  const extension = req.params[2];

  images.transform({ image, extension, transformations })
    .then(({ buffer, mimetype }) => res.type(mimetype).send(buffer))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
