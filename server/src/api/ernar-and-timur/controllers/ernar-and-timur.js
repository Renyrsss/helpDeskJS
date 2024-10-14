"use strict";

/**
 * ernar-and-timur controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::ernar-and-timur.ernar-and-timur");
module.exports = createCoreController(
  "api::ernar-and-timur.ernar-and-timur",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);

      const query = strapi.db.query("api::ernar-and-timur.ernar-and-timur");

      await Promise.all(
        data.map(async (item, index) => {
          const article = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ["createdBy"],
          });

          data[index].attributes.createdBy = {
            // id: page.createdBy.id,
            // firstname: page.createdBy.firstname,
            // lastname: page.createdBy.lastname,

            // change the page into article so it work
            firstname: article.createdBy.firstname,
            lastname: article.createdBy.lastname,
          };
        })
      );

      return { data, meta };
    },
  })
);
