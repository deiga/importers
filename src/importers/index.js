const postman = require('./postman');
const har = require('./har');
const insomnia1 = require('./insomnia-1');
const insomnia2 = require('./insomnia-2');
const utils = require('../utils');

const importers = {
  [postman.id]: postman,
  [har.id]: har,
  [insomnia1.id]: insomnia1,
  [insomnia2.id]: insomnia2,
};

module.exports.import = function (contents) {
  for (const id of Object.keys(importers)) {
    const importer = importers[id];
    const resources = importer.import(contents);

    if (resources) {
      return {
        _type: 'export',
        __export_format: 2,
        __export_date: utils.getDateString(),
        __export_source: 'insomnia.importers:v0.1.0',
        resources: resources.map(utils.setDefaults),
      }
    }
  }

  throw new Error('No importers found for file');
};
