var DataTypes = require("sequelize").DataTypes;
var _equipos = require("./equipos");
var _jugadores = require("./jugadores");
var _partidos = require("./partidos");
var _users = require("./users");

function initModels(sequelize) {
  var jugadores = _jugadores(sequelize, DataTypes);
  var equipos = _equipos(sequelize, DataTypes);
  var partidos = _partidos(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  

  jugadores.belongsTo(equipos, { as: "idequipo_equipo", foreignKey: "idequipo"});
  equipos.hasMany(jugadores, { as: "jugadores", foreignKey: "idequipo"});

  // Relación entre partidos y equipos (Partido tiene un equipo local y uno visitante)
  partidos.belongsTo(equipos, { as: "equipoLocal", foreignKey: "idequipolocal" });
  equipos.hasMany(partidos, { as: "partidosLocal", foreignKey: "idequipolocal" });

  partidos.belongsTo(equipos, { as: "equipoVisitante", foreignKey: "idequipovisitante" });
  equipos.hasMany(partidos, { as: "partidosVisitante", foreignKey: "idequipovisitante" });

  return {
    equipos,
    jugadores,
    partidos,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
