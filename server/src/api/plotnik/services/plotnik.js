'use strict';

/**
 * plotnik service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plotnik.plotnik');
