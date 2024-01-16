'use strict';

/**
 * said service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::said.said');
