"use strict";

/**
 * skud-zaprosy-help-desk router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter(
  "api::skud-zaprosy-help-desk.skud-zaprosy-help-desk",
  {
    config: {
      find: {
        middlewares: ["api::skud-zaprosy-help-desk.test-mid"],
      },
      findOne: {
        middlewares: ["api::skud-zaprosy-help-desk.test-mid"],
      },
    },
  }
);
