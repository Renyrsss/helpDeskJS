// 'use strict';

// /**
//  * aidar router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::aidar.aidar');

"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::aidar.aidar", {
  config: {
    find: {
      middlewares: ["api::aidar.test-mid"],
    },
    findOne: {
      middlewares: ["api::aidar.test-mid"],
    },
  },
});
