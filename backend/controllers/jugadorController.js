// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
const Equipo = models.equipos;
const Jugador = models.jugadores;

class JugadorController {
  async createJugador(req, res) {
    // Implementa la lógica para crear un nuevo jugador
    const jugador = req.body;

    try {
      const jugadorNuevo = await Jugador.create(jugador);

      res.status(201).json(Respuesta.exito(jugadorNuevo, "Jugador insertada"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(null, `Error al crear un jugador nuevo: ${jugador}`)
        );
    }
  }

  async getAllJugador(req, res) {
    try {
      const data = await Jugador.findAll({
        include: [
          {
            model: Equipo,
            as: "idequipo_equipo",
          },
        ],
      }); // Recuperar todos los jugadores
      res.json(Respuesta.exito(data, "Datos de jugadores recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los jugadores: ${req.originalUrl}`
          )
        );
    }
  }

  async deleteJugador(req, res) {
    const idjugador = req.params.idjugador;
    try {
      const numFilas = await Jugador.destroy({
        where: {
            idjugador: idjugador,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idjugador));
      } else {
        res.status(204).json(Respuesta.exito(null, "Jugador eliminado"));
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

  async getJugadorById(req, res) {
    // El id equipo viene en la ruta /api/equipos/:idequipo
    const idjugador = req.params.idjugador;
    try {
      const fila = await Jugador.findByPk(idjugador); 
      if(fila){ // Si se ha recuprado un jugador
        res.json(Respuesta.exito(fila, "Jugador recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Jugador no encontrado"));
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

  async updateJugador(req, res) {
    const jugador = req.body;
    const idjugador = req.params.idjugador;

    // Eliminamos la comprobación estricta de id para aceptar coincidencias con tipos distintos
    if (idjugador != jugador.idjugador) {
      console.warn(`Id ruta (${idjugador}) y cuerpo (${jugador.idjugador}) no coinciden, pero se continuará processing`);
      // opcional: podríamos asignar el id de ruta al cuerpo
      jugador.idjugador = idjugador;
    }

    try {
      // Verificar existencia previa al UPDATE
      const fila = await Jugador.findByPk(idjugador);
      if (!fila) {
        return res
          .status(404)
          .json(Respuesta.error(null, "Jugador no encontrado: " + idjugador));
      }

      // Ejecutar el UPDATE; ignorar si no hay cambios
      await Jugador.update(jugador, { where: { idjugador } });

      // Responder con éxito incluso si no se modificaron campos
      return res.status(200).json(
        Respuesta.exito(null, "Jugador modificado correctamente.")
      );
    } catch (err) {
      console.error("Error al actualizar jugador:", err);
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

module.exports = new JugadorController();

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
