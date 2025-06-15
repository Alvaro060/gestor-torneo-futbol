// Importar libreria para manejo de ficheros de configuración
require("dotenv").config();
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar librería de manejo de cookies
const cookieParser = require("cookie-parser");
// Importar gestores de rutas
const equipoRoutes = require("./routes/equipoRoutes");
const jugadorRoutes = require("./routes/jugadorRoutes");
const partidoRoutes = require("./routes/partidoRoutes");
const userRoutes = require("./routes/userRoutes");
const noticiasRoutes = require("./routes/noticiasRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true, // Permite el envío de cookies
  })
);

// Habilitar el análisis de cookies
app.use(cookieParser());

// Configurar rutas de la API Rest
app.use("/api/equipos", equipoRoutes);
app.use("/api/jugadores", jugadorRoutes);
app.use("/api/partidos", partidoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/noticias", noticiasRoutes);

// // Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
// app.use(express.static(path.join(__dirname, "public","old_js_vainilla")));

// Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "old_js_vainilla","index.html"));
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
