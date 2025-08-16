module.exports = {
  development: {
    username: "dev_user", // your db user
    password: "development123", // your db password
    database: "dev_blog", // your db name
    host: "127.0.0.1",
    dialect: "postgres", // 👈 IMPORTANT
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: "postgres",
  },
};
