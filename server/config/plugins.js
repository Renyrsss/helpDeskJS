module.exports = ({ env }) => ({
  // ...other plugins
  plausible: {
    config: {
      sharedLink: env("PLAUSIBLE_SHARED_LINK")
    }
  }
})