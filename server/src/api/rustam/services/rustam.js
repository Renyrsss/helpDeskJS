'use strict';

/**
 * rustam service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rustam.rustam');
