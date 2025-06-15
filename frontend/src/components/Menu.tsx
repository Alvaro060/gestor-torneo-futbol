import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import logo from "../assets/images/logo.png";
import { apiUrl } from "../config";

interface User {
  nombre: string;
  imagen_perfil?: string;
}

const Menu: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/getUserByToken`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <MDBNavbar expand="lg" style={{ backgroundColor: "#e31e1e" }}>
      <MDBContainer fluid className="d-flex justify-content-between align-items-center">
        {/* ====================== LOGO + TÍTULO ====================== */}
        <MDBNavbarBrand className="d-flex align-items-center">
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "4px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            <img
              src={logo}
              height="30"
              alt="Logo"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <span
            style={{ marginLeft: "10px", color: "white", fontWeight: "bold" }}
          >
            Gestión De LaLiga EA Sports
          </span>
        </MDBNavbarBrand>

        {/* ====================== MENÚ PRINCIPAL (SIEMPRE HORIZONTAL) ====================== */}
        <MDBNavbarNav className="d-flex align-items-center gap-4">
          {isLoggedIn ? (
            <>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home")}
                >
                  🏠 Inicio
                </MDBBtn>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link text-white"
                    role="button"
                  >
                    🛡️ Equipos
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{ backgroundColor: "#e31e1e" }}>
                    <Link
                      to="/home/altaequipo"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      ➕ Alta de equipo
                    </Link>
                    <Link
                      to="/home/escudosequipos"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      🏆 Equipos en LaLiga
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link text-white"
                    role="button"
                  >
                    👤 Jugadores
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{ backgroundColor: "#e31e1e" }}>
                    <Link
                      to="/home/altajugador"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      ➕ Alta de Jugadores
                    </Link>
                    <Link
                      to="/home/listadojugadores"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      📋 Listado de Jugadores
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="nav-link text-white"
                    role="button"
                  >
                    📅 Partidos
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{ backgroundColor: "#e31e1e" }}>
                    <Link
                      to="/home/altapartido"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      ➕ Alta de Partidos
                    </Link>
                    <Link
                      to="/home/calendariopartidos"
                      className="dropdown-item text-white"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      🗓️ Calendario de Partidos
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/clasificacion")}
                >
                  📊 Clasificación
                </MDBBtn>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/noticias")}
                >
                  📰 Noticias
                </MDBBtn>
              </MDBNavbarItem>
            </>
          ) : (
            <>
              {/* Rutas públicas cuando NO está logueado */}
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home")}
                >
                  🏠 Inicio
                </MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/escudosequipos")}
                >
                  🏆 Equipos en LaLiga
                </MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/listadojugadores")}
                >
                  📋 Listado de Jugadores
                </MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/calendariopartidos")}
                >
                  🗓️ Calendario de Partidos
                </MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/clasificacion")}
                >
                  📊 Clasificación
                </MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn
                  color="link"
                  className="nav-link p-0 text-white"
                  style={{ textTransform: "none" }}
                  onClick={() => handleNavClick("/home/noticias")}
                >
                  📰 Noticias
                </MDBBtn>
              </MDBNavbarItem>
            </>
          )}
        </MDBNavbarNav>

        {/* ====================== AVATAR / LOGIN ====================== */}
        {isLoggedIn && user ? (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              to="/home/perfil"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton sx={{ p: 0 }}>
                {user.imagen_perfil ? (
                  <Avatar
                    variant="square"
                    src={user.imagen_perfil}
                    alt={user.nombre}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      "& img": {
                        objectFit: "contain",
                        margin: "auto",
                        width: "100%",
                        height: "100%",
                        display: "block",
                      },
                    }}
                  />
                ) : (
                  <Avatar
                    variant="square"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      "& img": {
                        objectFit: "contain",
                        margin: "auto",
                        width: "100%",
                        height: "100%",
                        display: "block",
                      },
                    }}
                  >
                    {user.nombre.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
            </Link>
          </div>
        ) : (
          <div style={{ marginLeft: "auto" }}>
            <MDBBtn color="light" size="sm" onClick={() => navigate("/login")}>
              🔒 Inicio De Sesión Administradores
            </MDBBtn>
          </div>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Menu;