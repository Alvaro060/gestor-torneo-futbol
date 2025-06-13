// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo plato
const Equipo = models.equipos;

class EquipoController {
  async createEquipo(req, res) {
    // Implementa la lógica para crear un nuevo equipo
    const equipo = req.body;

    try {
      const equipoNuevo = await Equipo.create(equipo);

      res.status(201).json(Respuesta.exito(equipoNuevo, "Equipo insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(null, `Error al crear un equipo nuevo: ${equipo}`)
        );
    }
  }

  async getAllEquipo(req, res) {
    try {
      const data = await Equipo.findAll(); // Recuperar todos los equipos
      res.json(Respuesta.exito(data, "Datos de equipos recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los equipos: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteEquipo(req, res) {
    const idequipo = req.params.idequipo;
    try {
      const numFilas = await Equipo.destroy({
        where: {
          idequipo: idequipo,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idequipo));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getEquipoById(req, res) {
    // El id equipo viene en la ruta /api/equipos/:idequipo
    const idequipo = req.params.idequipo;
    try {
      const fila = await Equipo.findByPk(idequipo);
      if (fila) {
        // Si se ha recuprado un plato
        res.json(Respuesta.exito(fila, "Equipo recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Equipo no encontrado"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async updateEquipo(req, res) {
    const equipo = req.body;
    const idequipo = req.params.idequipo;

    // Usar comparación laxa para permitir string vs number, y reasignar si difieren
    if (idequipo != equipo.idequipo) {
      console.warn(`Id ruta (${idequipo}) y cuerpo (${equipo.idequipo}) no coinciden, pero se continuará processing`);
      equipo.idequipo = idequipo;
    }

    try {
      // Verificar existencia previa al UPDATE
      const fila = await Equipo.findByPk(idequipo);
      if (!fila) {
        return res
          .status(404)
          .json(Respuesta.error(null, "Equipo no encontrado: " + idequipo));
      }

      // Ejecutar el UPDATE; ignorar si no hay cambios
      await Equipo.update(equipo, { where: { idequipo } });

      // Responder con éxito incluso si no se modificaron campos
      return res.status(200).json(
        Respuesta.exito(null, "Equipo modificado correctamente.")
      );
    } catch (err) {
      console.error("Error al actualizar equipo:", err);
      return res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }


  // // Handles retrieval of a single type by its ID (implementation pending)
  // async getTipoById(req, res) {
  //   // Implementa la lógica para obtener un dato por ID (pendiente de implementar)
  //   const idtipo = req.params.idtipo;
  //   try {
  //     const data = await tipoService.getTipoById(idtipo); // Fetch all types from the service
  //     if(data.length > 0 ){
  //       res.json(Respuesta.exito(data, "Tipo recuperado"));
  //     } else {
  //       res.status(404).json(Respuesta.error(null, "Tipo no encontrado"));
  //     }

  //   } catch (err) {
  //     // Handle errors during the service call
  //     res
  //       .status(500)
  //       .json(
  //         Respuesta.error(
  //           null,
  //           `Error al recuperar los datos: ${req.originalUrl}`
  //         )
  //       );
  //   }
  // }

  // // Handles creation of a new type
  // async createTipo(req, res) {
  //   // Implementa la lógica para crear un nuevo dato
  //   const tipo = req.body;
  //   try {
  //     const idtipo = await tipoService.createTipo(tipo);
  //     // Relleno en el objeto que tenía el idtipo asignado
  //     // al insertar en la base de datos
  //     tipo.idtipo = idtipo;
  //     res.status(201).json(Respuesta.exito(tipo, "Tipo insertado"));
  //   } catch (err) {
  //     // Handle errors during the service call
  //     res
  //       .status(500)
  //       .json(
  //         Respuesta.error(
  //           null,
  //           `Error al recuperar los datos: ${req.originalUrl}`
  //         )
  //       );
  //   }

  // }

  // // Handles updating of a type by its ID (implementation pending)
  // async updateTipo(req, res) {
  //   const tipo = req.body; // Recuperamos datos para actualizar
  //   const idtipo = req.params.idtipo; // dato de la ruta
  //   try {
  //     const numFilas = await tipoService.updateTipo(tipo);

  //     if(numFilas == 0){ // No se ha encontrado lo que se quería actualizar
  //       res.status(404).json(Respuesta.error(null, "No encontrado: " + idtipo))
  //     } else{
  //       // Al dar status 204 no se devuelva nada
  //       res.status(204).json(Respuesta.exito(null, "Tipo actualizado"));
  //     }

  //   } catch (err) {
  //     // Handle errors during the service call
  //     res
  //       .status(500)
  //       .json(
  //         Respuesta.error(
  //           null,
  //           `Error al actualizar los datos: ${req.originalUrl}`
  //         )
  //       );
  //   }

  // }

  // // Handles deletion of a type by its ID (implementation pending)
  // async deleteTipo(req, res) {

  //   const idtipo = req.params.idtipo;
  //   try {
  //     const numFilas = await tipoService.deleteTipo(idtipo);
  //     if(numFilas == 0){ // No se ha encontrado lo que se quería borrar
  //       res.status(404).json(Respuesta.error(null, "No encontrado: " + idtipo))
  //     } else{
  //       res.status(204).json(Respuesta.exito(null, "Tipo eliminado"));
  //     }

  //   } catch (err) {
  //     // Handle errors during the service call
  //     res
  //       .status(500)
  //       .json(
  //         Respuesta.error(
  //           null,
  //           `Error al recuperar los datos: ${req.originalUrl}`
  //         )
  //       );
  //   }
  // }
}

module.exports = new EquipoController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
