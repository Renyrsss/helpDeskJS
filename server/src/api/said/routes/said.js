"use strict";

/**
 * said router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::said.said", {
  config: {
    find: {
      middlewares: ["api::said.test-mid"],
    },
    findOne: {
      middlewares: ["api::said.test-mid"],
    },
  },
});
