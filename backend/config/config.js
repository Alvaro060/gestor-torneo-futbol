require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "dpg-d167cveuk2gs739jmg5g-a.oregon-postgres.render.com",
    user: process.env.DB_USER || "gestortorneofutbol_user",
    password: process.env.DB_PASSWORD || "FpNw4c2y5dz4rQHH1pr4lcNWZb3d79zc",
    name: process.env.DB_NAME || "gestortorneofutbol",
    port: process.env.DB_PORT || 5432,  // <-- PostgreSQL usa 5432, no 3306
  },
  secretKey: process.env.SECRET_KEY || "default_secret",
};
