import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";

interface Jugador {
  idjugador: number;
  nombre: string;
  apellido: string;
  posicion: string;
  edad: number;
  fincontrato: string;
  idequipo: number;
}

interface Equipo {
  idequipo: number;
  nombre: string;
}

const ListadoJugadores = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<number | "">("");
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
    async function getJugadores() {
      const response = await fetch(apiUrl + "/jugadores");
      if (response.ok) {
        const data = await response.json();
        setJugadores(data.datos);
      } else {
        console.error("Error al obtener los jugadores");
      }
    }
    getJugadores();
  }, []);

  useEffect(() => {
    async function getEquipos() {
      const response = await fetch(apiUrl + "/equipos");
      if (response.ok) {
        const data = await response.json();
        const equiposOrdenados = data.datos.sort((a: Equipo, b: Equipo) =>
          a.nombre.localeCompare(b.nombre, undefined, { sensitivity: "base" })
        );
        setEquipos(equiposOrdenados);
      } else {
        console.error("Error al obtener los equipos");
      }
    }
    getEquipos();
  }, []);

  const handleDelete = async (idjugador: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${apiUrl}/jugadores/${idjugador}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const jugadoresActualizados = jugadores.filter(
          (jugador) => jugador.idjugador !== idjugador
        );
        setJugadores(jugadoresActualizados);

        Swal.fire({
          title: "¡Eliminado!",
          text: "El jugador ha sido eliminado correctamente.",
          icon: "success",
        });
      }
    }
  };

  const handleEquipoChange = (event: SelectChangeEvent<any>) => {
    const value = event.target.value;
    setEquipoSeleccionado(value);
  };

  const filteredJugadores = jugadores.filter((jugador) => {
    const matchesSearchTerm = jugador.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEquipo = equipoSeleccionado
      ? jugador.idequipo === equipoSeleccionado
      : true;

    return matchesSearchTerm && matchesEquipo;
  });

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
        📋 Listado de Jugadores
      </Typography>

      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 2,
          p: 3,
          mx: { xs: 0, md: 2 },
        }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Selecciona un equipo</InputLabel>
          <Select
            value={equipoSeleccionado}
            onChange={handleEquipoChange}
            label="Selecciona un equipo"
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {equipos.map((equipo) => (
              <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                {equipo.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Buscar por nombre"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TableContainer
          component={Paper}
          sx={{
            mt: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
              }}
            >
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Posición</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Fin Contrato</TableCell>
                <TableCell>Equipo</TableCell>
                {isLoggedIn && <TableCell>Editar</TableCell>}
                {isLoggedIn && <TableCell>Eliminar</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJugadores.map((jugador) => (
                <TableRow
                  key={jugador.idjugador}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{jugador.nombre}</TableCell>
                  <TableCell>{jugador.apellido}</TableCell>
                  <TableCell>{jugador.posicion}</TableCell>
                  <TableCell>{jugador.edad}</TableCell>
                  <TableCell>
                    {new Date(jugador.fincontrato).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    {equipos.find((eq) => eq.idequipo === jugador.idequipo)
                      ?.nombre || "Sin equipo"}
                  </TableCell>
                  {isLoggedIn && (
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(
                            "/home/modificarjugador/" + jugador.idjugador
                          )
                        }
                      >
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  )}
                  {isLoggedIn && (
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(jugador.idjugador)}
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListadoJugadores;
