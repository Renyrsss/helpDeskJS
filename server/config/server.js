module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  settings: {
    // ... другие настройки ...
    session: {
      // Добавьте ключи приложения сюда
      keys: ['myKeyA', 'myKeyB'],
    },
  },
});
