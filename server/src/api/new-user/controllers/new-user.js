'use strict';

/**
 * new-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::new-user.new-user');
