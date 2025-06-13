const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "jugadores",
    {
      idjugador: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      posicion: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      fincontrato: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idequipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "equipos",
          key: "idequipo",
        },
      },
    },
    {
      sequelize,
      tableName: "jugadores",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "idjugador" }],
        },
        {
          name: "FK_EQUIPOS",
          using: "BTREE",
          fields: [{ name: "idequipo" }],
        },
      ],
    }
  );
};
