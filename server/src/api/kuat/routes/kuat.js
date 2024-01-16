'use strict';

/**
 * kuat router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::kuat.kuat');
