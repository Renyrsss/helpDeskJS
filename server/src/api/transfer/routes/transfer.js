module.exports = {
  routes: [
    {
      method: "POST",
      path: "/requests/move",
      handler: "transfer.moveRequest",
      config: { policies: [] },
    },
  ],
};
