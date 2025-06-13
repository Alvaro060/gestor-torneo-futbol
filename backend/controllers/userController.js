// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Para comparar contraseñas cifradas
const bcrypt = require('bcrypt'); 
// Librería de manejo de JWT
const jwt = require('jsonwebtoken');
// Importar fichero de configuración con variables de entorno
const config = require('../config/config.js');

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo user
const User = models.users;

class UserController {
  async login(req, res) {
    const { email, contrasena } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json(Respuesta.error(null, "Usuario no encontrado"));
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (!validPassword) {
        return res
          .status(401)
          .json(Respuesta.error(null, "Contraseña incorrecta"));
      }

      // Generar el token JWT
      const token = jwt.sign(
        {
          sub: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
        config.secretKey,
        { expiresIn: "1h" }
      );

      // Configurar la cookie con el token
      res.cookie("token", token, {
        httpOnly: true, // Evita que JavaScript acceda a la cookie
        secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : 'Lax', // Protección CSRF // Lax en desarrollo
        maxAge: 3600000, // 1 hora en milisegundos
      });

      // Eliminar la contraseña del objeto de respuesta
      delete user.dataValues.contrasena;

      // Solo responde con el usuario y el token, sin mensaje de éxito
      res.status(200).json({
        success: true,
        user: user,
        token: token,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }

  async signup(req, res) {
    const { nombre, email, contrasena } = req.body;

    try {
      // Validar si todos los campos fueron proporcionados
      if (!nombre || !email || !contrasena) {
        return res
          .status(400)
          .json(Respuesta.error(null,"Faltan campos por informar" ));
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json(Respuesta.error(null,"Ya existe un usuario con ese correo electrónico." ) );
      }

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el nivel de "salting" (puedes ajustarlo)

      // Crear el nuevo usuario
      const newUser = await User.create({
        nombre,
        email,
        contrasena: hashedPassword, // Guardamos la contraseña cifrada
      });

      // Responder con éxito
      delete newUser.dataValues.contrasena; // Eliminar la contraseña del objeto de respuesta
      res.status(201).json({
        success: true,
        user: newUser,
      });

    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      res
        .status(500)
        .json(Respuesta.error(null, "Error al registrar el usuario, intenta nuevamente")); 
    }
  }

  /**
   * Logs out the user by clearing the authentication token cookie.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {void}
   */
  async logout(req, res) {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({
      success: true,
      message: "Cierre de sesión exitoso"
    });
  };

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener los usuarios",
      });
    }
  }

  async getUserByToken(req, res) {
    try {
      // verifyToken middleware puso req.user = payload
      const userId = req.user.sub;
      const user = await User.findByPk(userId, { attributes: { exclude: ['contrasena'] } });
      if (!user) {
        return res.status(404).json(Respuesta.error(null, "Usuario no encontrado"));
      }
      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(Respuesta.error(null, "Error interno del servidor"));
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const updates = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json(Respuesta.error(null, "Usuario no encontrado"));
      }

      // Actualizar campos permitidos
      await user.update(updates);

      // Recuperar usuario actualizado sin contraseña
      const updatedUser = await User.findByPk(userId, { attributes: { exclude: ['contrasena'] } });

      res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json(Respuesta.error(null, "Error al actualizar el perfil"));
    }
  }

  
}

module.exports = new UserController();