'use strict';

/**
 * aidar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::aidar.aidar');
