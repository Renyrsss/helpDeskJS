'use strict';

/**
 * kuat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kuat.kuat');
