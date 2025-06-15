import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { apiUrl } from "../config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";

interface Equipo {
  idequipo: number;
  escudo: string;
  nombre: string;
}

function EscudosEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/getUserByToken`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("No autorizado");
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    async function getEquipos() {
      try {
        const response = await fetch(`${apiUrl}/equipos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        const equiposOrdenados = data.datos.sort((a: Equipo, b: Equipo) =>
          a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
        );
        setEquipos(equiposOrdenados);
      } catch (error) {
        console.error("Error obteniendo equipos:", error);
      }
    }

    getEquipos();
  }, []);

  const handleDelete = async (idequipo: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${apiUrl}/equipos/${idequipo}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const equiposActualizados = equipos.filter(
          (equipo) => equipo.idequipo !== idequipo
        );
        setEquipos(equiposActualizados);

        Swal.fire({
          title: "¡Eliminado!",
          text: "El equipo ha sido eliminado correctamente.",
          icon: "success",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          mb: 2,
          color: "#fff",
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.9)",
        }}
      >
        🏆 Equipos En LaLiga
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          {equipos.map((equipo) => (
            <Card
              key={equipo.idequipo}
              sx={{
                width: 350,
                m: 2,
                boxShadow: 3,
                borderRadius: 2,
                minHeight: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                width="250"
                image={equipo.escudo}
                alt={`Escudo de ${equipo.nombre}`}
                sx={{
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="div" align="center" noWrap>
                  {equipo.nombre}
                </Typography>
                {isLoggedIn && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "100px" }}
                      onClick={() =>
                        navigate("/home/modificarEquipo/" + equipo.idequipo)
                      }
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ width: "100px" }}
                      onClick={() => handleDelete(equipo.idequipo)}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default EscudosEquipos;