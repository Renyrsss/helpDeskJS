"use strict";

/**
 * bahador router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::bahador.bahador');

"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::bahador.bahador", {
  config: {
    find: {
      middlewares: ["api::bahador.test-mid"],
    },
    findOne: {
      middlewares: ["api::bahador.test-mid"],
    },
  },
});
