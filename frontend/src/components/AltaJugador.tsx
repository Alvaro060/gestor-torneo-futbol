import {
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import { SelectChangeEvent } from "@mui/material/Select";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";

interface Equipo {
  idequipo: number;
  nombre: string;
}

const AltaJugador = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    posicion: "",
    edad: "",
    fincontrato: "",
    idequipo: "",
  });

  const [validacion, setValidacion] = useState({
    nombre: false,
    apellido: false,
    posicion: false,
    edad: false,
    fincontrato: false,
    idequipo: false,
  });

  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/equipos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.datos) {
          const equiposOrdenados = data.datos.sort((a: Equipo, b: Equipo) =>
            a.nombre.localeCompare(b.nombre)
          );
          setEquipos(equiposOrdenados);
        } else {
          console.error("Error en la respuesta de equipos:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los equipos:", error);
      });
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarDatos = (): boolean => {
    const nuevaValidacion = {
      nombre: datos.nombre.trim().length < 2,
      apellido: datos.apellido.trim().length < 2,
      posicion: datos.posicion.trim().length < 2,
      edad: !/^[0-9]+$/.test(datos.edad) || parseInt(datos.edad) < 16,
      fincontrato: !/^\d{4}-\d{2}-\d{2}$/.test(datos.fincontrato),
      idequipo: !/^[0-9]+$/.test(datos.idequipo),
    };

    setValidacion(nuevaValidacion);
    return !Object.values(nuevaValidacion).some((val) => val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(`${apiUrl}/jugadores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...datos,
            edad: parseInt(datos.edad),
            idequipo: parseInt(datos.idequipo),
          }),
        });

        if (response.ok) {
          const respuesta = await response.json();

          if (respuesta.ok) {
            Swal.fire({
              icon: "success",
              title: "¡Éxito!",
              text: "Jugador creado con éxito.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              navigate("/home");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: respuesta.mensaje || "No se pudo crear el jugador.",
              confirmButtonText: "Aceptar",
            });
          }
        }
      } catch (error: unknown) {
        console.error("Error:", error);
        if (error instanceof Error) {
          Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo conectar con el servidor.",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error desconocido",
            text: "Hubo un error inesperado.",
            confirmButtonText: "Aceptar",
          });
        }
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
        ➕ Alta de Jugadores
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Stack
          component="form"
          spacing={2}
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "100%", sm: "60%", md: "40%" },
            mx: 2,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 2,
            p: 3,
          }}
        >
          <TextField
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            error={validacion.nombre}
            helperText={validacion.nombre && "Debe tener al menos 2 caracteres"}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            name="apellido"
            value={datos.apellido}
            onChange={handleChange}
            error={validacion.apellido}
            helperText={
              validacion.apellido && "Debe tener al menos 2 caracteres"
            }
          />

          <FormControl fullWidth error={validacion.posicion}>
            <InputLabel sx={{ color: "#000" }} id="posicion-label">
              Posición
            </InputLabel>
            <Select
              labelId="posicion-label"
              name="posicion"
              value={datos.posicion}
              label="Posición"
              onChange={handleChange}
              sx={{
                color: "#000",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.5)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
                "& .MuiSvgIcon-root": {
                  color: "#000",
                },
              }}
            >
              <MenuItem value="Portero">Portero</MenuItem>
              <MenuItem value="Defensa">Defensa</MenuItem>
              <MenuItem value="Mediocentro">Mediocentro</MenuItem>
              <MenuItem value="Delantero">Delantero</MenuItem>
            </Select>
            {validacion.posicion && (
              <Typography color="error" variant="caption">
                Debe especificar una posición válida
              </Typography>
            )}
          </FormControl>

          <TextField
            label="Edad"
            variant="outlined"
            name="edad"
            type="number"
            value={datos.edad}
            onChange={handleChange}
            error={validacion.edad}
            helperText={
              validacion.edad && "Edad debe ser un número mayor o igual a 16"
            }
          />
          <TextField
            label="Fin de Contrato"
            variant="outlined"
            type="date"
            name="fincontrato"
            value={datos.fincontrato}
            onChange={handleChange}
            error={validacion.fincontrato}
            helperText={validacion.fincontrato && "Fecha en formato YYYY-MM-DD"}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth error={validacion.idequipo}>
            <InputLabel sx={{ color: "#000" }} id="equipo-label">
              Equipo
            </InputLabel>
            <Select
              labelId="equipo-label"
              name="idequipo"
              value={datos.idequipo}
              label="Equipo"
              onChange={handleChange}
              sx={{
                color: "#000",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.5)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
                "& .MuiSvgIcon-root": {
                  color: "#000",
                },
              }}
            >
              {equipos.map((equipo) => (
                <MenuItem
                  key={equipo.idequipo}
                  value={equipo.idequipo.toString()}
                >
                  {equipo.nombre}
                </MenuItem>
              ))}
            </Select>
            {validacion.idequipo && (
              <Typography color="error" variant="caption">
                Debe seleccionar un equipo válido
              </Typography>
            )}
          </FormControl>

          <Button variant="contained" type="submit">
            Aceptar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AltaJugador;
