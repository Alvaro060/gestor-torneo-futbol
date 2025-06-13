import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { apiUrl } from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";

interface Equipo {
  idequipo: number;
  nombre: string;
  escudo: string;
}

interface Partido {
  idpartido: number;
  fechahora: string;
  jornada: number;
  estado: string;
  goleslocal?: number | null;
  golesvisitante?: number | null;
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
}

interface GroupedMatches {
  [jornada: number]: Partido[];
}

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("¡Ya ha comenzado!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Typography
      variant="body2"
      sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center", mt: 1 }}
    >
      {timeLeft}
    </Typography>
  );
};

const CalendarioPartidos: React.FC = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [grouped, setGrouped] = useState<GroupedMatches>({});
  const [searchJornada, setSearchJornada] = useState("");
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
    fetch(`${apiUrl}/partidos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const partidosOrdenados = data.datos.sort(
            (a: Partido, b: Partido) => {
              return (
                new Date(a.fechahora).getTime() -
                new Date(b.fechahora).getTime()
              );
            }
          );
          setPartidos(partidosOrdenados);
        } else {
          console.error("Error en respuesta de partidos:", data);
        }
      })
      .catch((err) => console.error("Error al obtener partidos:", err));
  }, []);

  useEffect(() => {
    const agrupados: GroupedMatches = partidos.reduce((acc, partido) => {
      const j = partido.jornada;
      if (!acc[j]) acc[j] = [];
      acc[j].push(partido);
      return acc;
    }, {} as GroupedMatches);
    setGrouped(agrupados);
  }, [partidos]);

  const jornadas = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  const filteredJornadas = jornadas.filter((j) =>
    j.toString().includes(searchJornada)
  );

  const handleDelete = async (idpartido: number, jornada: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/partidos/${idpartido}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (response.ok) {
          const partidosActualizados = partidos.filter(
            (p) => p.idpartido !== idpartido
          );
          setPartidos(partidosActualizados);

          const gruposActualizados = { ...grouped };
          gruposActualizados[jornada] = gruposActualizados[jornada].filter(
            (p) => p.idpartido !== idpartido
          );
          if (gruposActualizados[jornada].length === 0) {
            delete gruposActualizados[jornada];
          }
          setGrouped(gruposActualizados);

          Swal.fire({
            title: "¡Eliminado!",
            text: "El partido ha sido eliminado correctamente.",
            icon: "success",
          });
        } else {
          throw new Error("Error al eliminar el partido");
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el partido. Intenta de nuevo.",
          icon: "error",
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
        🗓️ Calendario de Partidos
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#fff" }}>Seleccionar Jornada</InputLabel>
        <Select
          value={searchJornada}
          label="Seleccionar Jornada"
          onChange={(e) => setSearchJornada(e.target.value)}
          sx={{
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.7)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {jornadas.map((j) => (
            <MenuItem key={j} value={j.toString()}>
              Jornada {j}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredJornadas.map((jornada) => (
        <Box key={jornada} sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "#fff",
              fontWeight: "bold",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Jornada {jornada}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {grouped[jornada].map((partido) => (
              <Card
                key={partido.idpartido}
                sx={{
                  width: 450,
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  boxShadow: 4,
                  borderRadius: 3,
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  color: "inherit",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                >
                  {new Date(partido.fechahora).toLocaleString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <CountdownTimer targetDate={partido.fechahora} />

                {/* Equipos */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                    mt: 3,
                    mb: 1,
                    gap: 2,
                  }}
                >
                  {/* Local */}
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 120,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={partido.equipoLocal.escudo}
                      alt={partido.equipoLocal.nombre}
                      sx={{ width: 100, height: 100, objectFit: "contain" }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, wordBreak: "break-word" }}
                    >
                      {partido.equipoLocal.nombre}
                    </Typography>
                  </Box>

                  {/* Visitante */}
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 120,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={partido.equipoVisitante.escudo}
                      alt={partido.equipoVisitante.nombre}
                      sx={{ width: 100, height: 100, objectFit: "contain" }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, wordBreak: "break-word" }}
                    >
                      {partido.equipoVisitante.nombre}
                    </Typography>
                  </Box>
                </Box>

                {/* Goles */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  {partido.goleslocal !== undefined && (
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {partido.goleslocal}
                    </Typography>
                  )}
                  <Typography variant="h6" sx={{ px: 1 }}>
                    {"-"}
                  </Typography>
                  {partido.golesvisitante !== undefined && (
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {partido.golesvisitante}
                    </Typography>
                  )}
                </Box>

                {/* Estado y botones */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {partido.estado}
                  </Typography>

                  {isLoggedIn && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(
                            "/home/modificarPartido/" + partido.idpartido
                          )
                        }
                        sx={{ backgroundColor: "#1976d2" }}
                      >
                        <EditNoteIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleDelete(partido.idpartido, partido.jornada)
                        }
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </Box>
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CalendarioPartidos;
