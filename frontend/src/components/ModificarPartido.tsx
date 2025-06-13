import {
  Typography,
  TextField,
  Stack,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiUrl } from "../config";
import fondo from "../assets/images/fondo_noticias.png";

function ModificarPartido() {
  const params = useParams<{ idpartido: string }>();
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<any[]>([]);
  const [partido, setPartido] = useState({
    idequipo: "",
    idequipolocal: "",
    idequipovisitante: "",
    jornada: "",
    fechahora: "",
    goleslocal: "",
    golesvisitante: "",
    estado: "Programado",
  });

  const [validacion, setValidacion] = useState({
    idequipo: false,
    jornada: false,
    fechahora: false,
    goleslocal: false,
    golesvisitante: false,
    estado: false,
  });

  useEffect(() => {
    const obtenerPartido = async () => {
      try {
        const response = await fetch(`${apiUrl}/partidos/${params.idpartido}`);
        if (response.ok) {
          const data = await response.json();
          setPartido(data.datos);
        } else {
          alert("Error al obtener el partido.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener partido:", error);
        alert("No se pudo obtener el partido.");
        navigate("/");
      }
    };

    const obtenerEquipos = async () => {
      try {
        const response = await fetch(`${apiUrl}/equipos`);
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

    obtenerPartido();
    obtenerEquipos();
  }, [params.idpartido, navigate]);

  // Sólo se modifica validarDatos para permitir 0 ó más
  const validarDatos = () => {
    let validado = true;
    const v = {
      idequipo: false,
      jornada: false,
      fechahora: false,
      goleslocal: false,
      golesvisitante: false,
      estado: false,
    };

    if (
      !partido.jornada ||
      isNaN(Number(partido.jornada)) ||
      Number(partido.jornada) < 1
    ) {
      v.jornada = true;
      validado = false;
    }
    if (!partido.fechahora) {
      v.fechahora = true;
      validado = false;
    }
    // Aquí permitimos 0 como válido
    const gl = Number(partido.goleslocal);
    if (
      partido.goleslocal === "" ||
      isNaN(gl) ||
      gl < 0
    ) {
      v.goleslocal = true;
      validado = false;
    }
    const gv = Number(partido.golesvisitante);
    if (
      partido.golesvisitante === "" ||
      isNaN(gv) ||
      gv < 0
    ) {
      v.golesvisitante = true;
      validado = false;
    }
    if (!partido.idequipolocal || !partido.idequipovisitante) {
      v.idequipo = true;
      validado = false;
    }
    if (!partido.estado) {
      v.estado = true;
      validado = false;
    }

    setValidacion(v);
    return validado;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPartido({
      ...partido,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(
          `${apiUrl}/partidos/${params.idpartido}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              ...partido,
              goleslocal: Number(partido.goleslocal),
              golesvisitante: Number(partido.golesvisitante),
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Partido modificado correctamente.",
            confirmButtonText: "Aceptar",
          });
          navigate(-1);
        } else {
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error al modificar partido:", error);
        alert("No se pudo modificar el partido.");
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
      📅 Modificar Partido
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
          label="Jornada"
          variant="outlined"
          name="jornada"
          value={partido.jornada}
          disabled
        />

        <TextField
          label="Fecha y Hora"
          type="datetime-local"
          name="fechahora"
          value={partido.fechahora}
          onChange={handleChange}
          error={validacion.fechahora}
          helperText={validacion.fechahora && "La fecha y hora es obligatoria"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Goles Local"
          type="number"
          name="goleslocal"
          value={partido.goleslocal}
          onChange={handleChange}
          error={validacion.goleslocal}
          helperText={validacion.goleslocal && "Debe ser mayor o igual a 0"}
        />

        <TextField
          label="Goles Visitante"
          type="number"
          name="golesvisitante"
          value={partido.golesvisitante}
          onChange={handleChange}
          error={validacion.golesvisitante}
          helperText={validacion.golesvisitante && "Debe ser mayor o igual a 0"}
        />

        <FormControl fullWidth>
          <InputLabel>Equipo Local</InputLabel>
          <Select name="idequipolocal" value={partido.idequipolocal} disabled>
            {equipos.map((equipo) => (
              <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                {equipo.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Equipo Visitante</InputLabel>
          <Select name="idequipovisitante" value={partido.idequipovisitante} disabled>
            {equipos.map((equipo) => (
              <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                {equipo.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth error={validacion.estado}>
          <InputLabel>Estado</InputLabel>
          <Select
            name="estado"
            value={partido.estado}
            onChange={(e) =>
              setPartido({ ...partido, estado: e.target.value })
            }
          >
            <MenuItem value="Programado">Programado</MenuItem>
            <MenuItem value="En curso">En curso</MenuItem>
            <MenuItem value="Finalizado">Finalizado</MenuItem>
          </Select>
          {validacion.estado && (
            <FormHelperText>Por favor, selecciona un estado</FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" type="submit">
          Aceptar
        </Button>
      </Stack>
    </Box>
  </Box>
);

}

export default ModificarPartido;
