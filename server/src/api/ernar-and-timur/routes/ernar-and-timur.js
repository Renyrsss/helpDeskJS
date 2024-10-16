// 'use strict';

// /**
//  * ernar-and-timur router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::ernar-and-timur.ernar-and-timur');
"use strict";

/**
 * ernar-and-timur router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::ernar-and-timur.ernar-and-timur", {
  config: {
    find: {
      middlewares: ["api::ernar-and-timur.test-mid"],
    },
    findOne: {
      middlewares: ["api::ernar-and-timur.test-mid"],
    },
  },
});
