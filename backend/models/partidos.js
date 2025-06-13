const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "partidos",
    {
      idpartido: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      fechahora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idequipolocal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "equipos",
          key: "idequipo",
        },
      },
      idequipovisitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "equipos",
          key: "idequipo",
        },
      },
      goleslocal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      golesvisitante: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM("Programado", "En curso", "Finalizado"),
        allowNull: false,
      },
      jornada: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },      
    },
    {
      sequelize,
      tableName: "partidos",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "idpartido" }],
        },
        {
          name: "FK_PARTIDOS_EQUIPOLOCAL",
          using: "BTREE",
          fields: [{ name: "idequipolocal" }],
        },
        {
          name: "FK_PARTIDOS_EQUIPOVISITANTE",
          using: "BTREE",
          fields: [{ name: "idequipovisitante" }],
        },
      ],
    }
  );
};
