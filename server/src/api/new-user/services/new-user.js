'use strict';

/**
 * new-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-user.new-user');
