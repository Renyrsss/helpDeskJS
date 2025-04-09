module.exports = {
  async moveRequest(ctx) {
    try {
      const { oldCollection, requestId, newCollection } = ctx.request.body;

      // 1. Находим заявку в старой коллекции
      const request = await strapi.entityService.findOne(
        `api::${oldCollection}.${oldCollection}`,
        requestId
      );

      if (!request)
        return ctx.badRequest("Заявка не найдена в старой коллекции");

      // 2. Создаем такую же заявку в новой коллекции
      const newRequest = await strapi.entityService.create(
        `api::${newCollection}.${newCollection}`,
        {
          data: {
            ...request, // Копируем все данные
          },
        }
      );

      // 3. Удаляем заявку из старой коллекции
      await strapi.entityService.delete(
        `api::${oldCollection}.${oldCollection}`,
        requestId
      );

      ctx.send({ message: "Заявка успешно перемещена", newRequest });
    } catch (error) {
      ctx.throw(500, "Ошибка при перемещении заявки");
    }
  },
};
