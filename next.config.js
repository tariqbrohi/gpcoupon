const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  reactStrictMode: true,
  env: {
    ID: process.env.ID,
    SECRET: process.env.SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    GP_CLIENT_ID: process.env.GP_CLIENT_ID,
    GP_CLIENT_SECRET: process.env.GP_CLIENT_SECRET,
  },
});
