import {
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiUrl } from "../config";
import fondo from "../assets/images/fondo_noticias.png";

function ModificarJugador() {
  const params = useParams<{ idjugador: string }>();
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<any[]>([]);

  const [datos, setDatos] = useState({
    idjugador: params.idjugador!,
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

  useEffect(() => {
    const obtenerJugador = async () => {
      try {
        const response = await fetch(`${apiUrl}/jugadores/${datos.idjugador}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setDatos(data.datos);
        } else {
          const data = await response.json();
          alert(data.mensaje);
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener jugador:", error);
        alert("No se pudo obtener el jugador.");
        navigate("/");
      }
    };

    const obtenerEquipos = async () => {
      try {
        const response = await fetch(`${apiUrl}/equipos`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEquipos(data.datos);
        } else {
          alert("Error al obtener equipos.");
        }
      } catch (error) {
        console.error("Error al obtener equipos:", error);
        alert("Error en la conexión con el servidor.");
      }
    };

    obtenerJugador();
    obtenerEquipos();
  }, [datos.idjugador, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(`${apiUrl}/jugadores/${datos.idjugador}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Jugador modificado correctamente.",
            confirmButtonText: "Aceptar",
          });
          navigate(-1);
        } else {
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error al modificar jugador:", error);
        alert("No se pudo modificar el jugador.");
      }
    }
  };

  const validarDatos = () => {
    let validado = true;
    const v = {
      nombre: false,
      apellido: false,
      posicion: false,
      edad: false,
      fincontrato: false,
      idequipo: false,
    };

    if (datos.nombre.trim().length < 2) {
      v.nombre = true;
      validado = false;
    }
    if (datos.apellido.trim().length < 2) {
      v.apellido = true;
      validado = false;
    }
    if (datos.posicion.trim().length < 2) {
      v.posicion = true;
      validado = false;
    }
    if (!/^\d+$/.test(datos.edad) || Number(datos.edad) < 15 || Number(datos.edad) > 50) {
      v.edad = true;
      validado = false;
    }
    if (!datos.fincontrato) {
      v.fincontrato = true;
      validado = false;
    }
    if (!datos.idequipo) {
      v.idequipo = true;
      validado = false;
    }

    setValidacion(v);
    return validado;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setDatos({ ...datos, [name]: value });
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
    {/* Título con estilo blanco y sombra */}
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
      👤 Modificar Jugador
    </Typography>

    {/* Contenedor que centra el formulario con fondo semitransparente */}
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
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          error={validacion.nombre}
          helperText={validacion.nombre && "Mínimo 2 caracteres"}
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={datos.apellido}
          onChange={handleChange}
          error={validacion.apellido}
          helperText={validacion.apellido && "Mínimo 2 caracteres"}
        />

        {/* Select para Posición */}
        <FormControl fullWidth error={validacion.posicion}>
          <InputLabel id="posicion-label">Posición</InputLabel>
          <Select
            labelId="posicion-label"
            name="posicion"
            value={datos.posicion}
            onChange={handleChange}
            label="Posición"
          >
            <MenuItem value="Portero">Portero</MenuItem>
            <MenuItem value="Defensa">Defensa</MenuItem>
            <MenuItem value="Mediocentro">Mediocentro</MenuItem>
            <MenuItem value="Delantero">Delantero</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Edad"
          name="edad"
          value={datos.edad}
          onChange={handleChange}
          error={validacion.edad}
          helperText={validacion.edad && "Debe ser un número entre 15 y 50"}
        />
        <TextField
          label="Fin de Contrato"
          type="date"
          name="fincontrato"
          value={datos.fincontrato}
          onChange={handleChange}
          error={validacion.fincontrato}
          helperText={validacion.fincontrato && "Debes seleccionar una fecha"}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Equipo"
          name="idequipo"
          value={datos.idequipo}
          onChange={handleChange}
          error={validacion.idequipo}
          helperText={validacion.idequipo && "Debes seleccionar un equipo"}
        >
          {equipos.map((equipo) => (
            <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
              {equipo.nombre}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" type="submit">
          Aceptar
        </Button>
      </Stack>
    </Box>
  </Box>
);

}

export default ModificarJugador;