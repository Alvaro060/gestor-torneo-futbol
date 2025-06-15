// src/index.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import Login from "./components/Login";
import Home from "./pages/Home";
import PaginaError from "./pages/PaginaError";
import PerfilPage from "./components/PerfilPage";

import AltaEquipo from "./components/AltaEquipo";
import EscudosEquipos from "./components/EscudosEquipos";
import ModificarEquipo from "./components/ModificarEquipo";
import AltaJugador from "./components/AltaJugador";
import ListadoJugadores from "./components/ListadoJugadores";
import ModificarJugador from "./components/ModificarJugador";
import AltaPartido from "./components/AltaPartido";
import CalendarioPartidos from "./components/CalendarioPartidos";
import ModificarPartido from "./components/ModificarPartido";
import Clasificacion from "./components/Clasificacion";
import NoticiasFutbol from "./components/NoticiasFutbol";
import CarruselPaginaPrincipal from "./components/CarruselPaginaPrincipal";

import { apiUrl } from "./config"; // Asegúrate de que apiUrl apunte correctamente a tu backend

// ---------------------------------------------------------------
// Componente wrapper para la página de perfil, con logout completo
// ---------------------------------------------------------------
const PerfilWrapper: React.FC = () => {
  const handleLogout = async () => {
    try {
      // Llamamos primero al endpoint /users/logout para que el servidor
      // elimine la cookie "token".
      await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Error al llamar a /users/logout:", err);
    }

    // Borramos el token de localStorage (por si lo estuvieses usando)
    localStorage.removeItem("token");

    // Forzamos recarga completa navegando a /#/home
    window.location.href = "/#/home";
  };

  return <PerfilPage onLogout={handleLogout} />;
};

// ---------------------------------------------------------------
// Ruta protegida que comprueba si existe token en localStorage
// ---------------------------------------------------------------
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Si no hay token, forzamos al usuario a /#/login
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// ---------------------------------------------------------------
// Definición del router principal (usando HashRouter)
// ---------------------------------------------------------------
const router = createHashRouter([
  // Ahora "/" redirige por defecto a "/home"
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },

  // Mantenemos el componente Login en "/login"
  {
    path: "/login",
    element: <Login />,
  },

  // Rutas dentro de /home (Home funciona como un layout)
  {
    path: "/home",
    element: <Home />,
    errorElement: <PaginaError />,
    children: [
      // —— Rutas públicas (visibles aunque no haya token) ——
      { index: true, element: <CarruselPaginaPrincipal /> },
      { path: "noticias", element: <NoticiasFutbol /> },
      { path: "escudosequipos", element: <EscudosEquipos /> },
      { path: "listadojugadores", element: <ListadoJugadores /> },
      { path: "calendariopartidos", element: <CalendarioPartidos /> },
      { path: "clasificacion", element: <Clasificacion /> },

      // —— Rutas protegidas (solo si hay token) ——
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <PerfilWrapper />
          </ProtectedRoute>
        ),
      },
      {
        path: "altaequipo",
        element: (
          <ProtectedRoute>
            <AltaEquipo />
          </ProtectedRoute>
        ),
      },
      {
        path: "modificarEquipo/:idequipo",
        element: (
          <ProtectedRoute>
            <ModificarEquipo />
          </ProtectedRoute>
        ),
      },
      {
        path: "altajugador",
        element: (
          <ProtectedRoute>
            <AltaJugador />
          </ProtectedRoute>
        ),
      },
      {
        path: "modificarJugador/:idjugador",
        element: (
          <ProtectedRoute>
            <ModificarJugador />
          </ProtectedRoute>
        ),
      },
      {
        path: "altapartido",
        element: (
          <ProtectedRoute>
            <AltaPartido />
          </ProtectedRoute>
        ),
      },
      {
        path: "modificarPartido/:idpartido",
        element: (
          <ProtectedRoute>
            <ModificarPartido />
          </ProtectedRoute>
        ),
      },

      // Si intentan acceder a cualquier otro subpath de /home,
      // los redirigimos a "/home/perfil"
      { path: "*", element: <Navigate to="/home/perfil" replace /> },
    ],
  },

  // Página de error genérica
  {
    path: "/pagina-error",
    element: <PaginaError />,
  },
  // Cualquier otra ruta no definida redirige a "/home"
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

// ---------------------------------------------------------------
// Renderizado de la app
// ---------------------------------------------------------------
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error("Elemento con id 'root' no encontrado en el HTML.");
}
