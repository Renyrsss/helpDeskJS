"use strict";

/**
 * kuat router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::kuat.kuat", {
  config: {
    find: {
      middlewares: ["api::kuat.test-mid"],
    },
    findOne: {
      middlewares: ["api::kuat.test-mid"],
    },
  },
});
