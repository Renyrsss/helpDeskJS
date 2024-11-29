"use strict";

/**
 * kuat router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::rustam.rustam", {
  config: {
    find: {
      middlewares: ["api::rustam.rustam.test-mid"],
    },
    findOne: {
      middlewares: ["api::rustam.rustam.test-mid"],
    },
  },
});
