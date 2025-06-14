// config/sequelize.js
const { Sequelize } = require("sequelize");
// Importar fichero de configuración con variables de entorno
const config = require("./config");

// Instanciar sequelize para conectar a Postgres
const sequelize = new Sequelize(
  config.db.name, // nombre bd
  config.db.user, // usuario
  config.db.password, // password
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (msg) => {
      if (msg.includes("ERROR")) {
        console.error("Error de Sequelize:", msg);
      }
    },
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos PostgreSQL");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
})();

module.exports = sequelize;
