export default () => ({
  PORT: parseInt(process.env.PORT, 10),
  DATABASE: {
    CONNECTION: process.env.DB_CONNECTION,
    HOST: process.env.DB_HOST,
    PORT: +process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
  AUTH: {
    USERNAME: process.env.AUTH_USER || 'admin',
    PASSWORD: process.env.AUTH_PSWD || 'password',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
});
