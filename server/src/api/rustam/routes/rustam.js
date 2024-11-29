"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::rustam.rustam", {
  config: {
    find: {
      middlewares: ["api::rustam.test-mid"],
    },
    findOne: {
      middlewares: ["api::rustam.test-mid"],
    },
  },
});
