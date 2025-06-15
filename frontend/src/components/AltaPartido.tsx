import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import Swal from "sweetalert2";
import { apiUrl } from "../config";
import fondo from "../assets/images/fondo_noticias.png";

interface Equipo {
  idequipo: number;
  nombre: string;
}

interface Partido {
  idequipolocal: number;
  idequipovisitante: number;
  jornada: number;
}

const AltaPartido = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [datos, setDatos] = useState({
    fechahora: "",
    idequipolocal: "",
    idequipovisitante: "",
    goleslocal: "",
    golesvisitante: "",
    estado: "Programado",
    jornada: "",
  });

  const [errores, setErrores] = useState({
    fechahora: false,
    idequipolocal: false,
    idequipovisitante: false,
    jornada: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/equipos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.datos) {
          const ordenados = data.datos.sort((a: Equipo, b: Equipo) =>
            a.nombre.localeCompare(b.nombre)
          );
          setEquipos(ordenados);
        }
      })
      .catch((err) => console.error("Error al obtener equipos:", err));

    fetch(`${apiUrl}/partidos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.datos) {
          setPartidos(data.datos);
        }
      })
      .catch((err) => console.error("Error al obtener partidos:", err));
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setDatos((prev) => {
      if (name === "idequipolocal" && value === datos.idequipovisitante) {
        return { ...prev, [name]: value, idequipovisitante: "" };
      }
      if (name === "idequipovisitante" && value === datos.idequipolocal) {
        return { ...prev, [name]: value, idequipolocal: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const validar = () => {
    const erroresActualizados = {
      fechahora: datos.fechahora.trim() === "",
      idequipolocal: datos.idequipolocal === "",
      idequipovisitante: datos.idequipovisitante === "",
      jornada:
        !/^\d+$/.test(datos.jornada) ||
        parseInt(datos.jornada) < 1 ||
        parseInt(datos.jornada) > 38,
    };

    setErrores(erroresActualizados);
    return !Object.values(erroresActualizados).some((e) => e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      try {
        const response = await fetch(`${apiUrl}/partidos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...datos,
            idequipolocal: parseInt(datos.idequipolocal),
            idequipovisitante: parseInt(datos.idequipovisitante),
            goleslocal: datos.goleslocal ? parseInt(datos.goleslocal) : null,
            golesvisitante: datos.golesvisitante
              ? parseInt(datos.golesvisitante)
              : null,
            jornada: parseInt(datos.jornada),
          }),
        });

        const result = await response.json();

        if (response.ok && result.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Partido creado correctamente.",
            confirmButtonText: "Aceptar",
          }).then(() => navigate("/home"));
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.mensaje || "No se pudo crear el partido",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor.",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const equiposDisponibles = (jornada: string) => {
    if (!jornada) return equipos;

    const equiposOcupados = partidos
      .filter((p) => p.jornada === parseInt(jornada))
      .map((p) => p.idequipolocal)
      .concat(
        partidos
          .filter((p) => p.jornada === parseInt(jornada))
          .map((p) => p.idequipovisitante)
      );

    return equipos.filter((e) => !equiposOcupados.includes(e.idequipo));
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
      ➕ Alta de Partidos
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
          label="Jornada (1-38)"
          type="number"
          name="jornada"
          value={datos.jornada}
          onChange={handleChange}
          error={errores.jornada}
          helperText={errores.jornada && "Debe ser un número entre 1 y 38"}
        />

        <TextField
          label="Fecha y Hora"
          type="datetime-local"
          name="fechahora"
          value={datos.fechahora}
          onChange={handleChange}
          error={errores.fechahora}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth error={errores.idequipolocal}>
          <InputLabel sx={{ color: "#000" }}>Equipo Local</InputLabel>
          <Select
            name="idequipolocal"
            value={datos.idequipolocal}
            label="Equipo Local"
            onChange={handleChange}
            disabled={!datos.jornada}
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
            {equiposDisponibles(datos.jornada).map((e) => (
              <MenuItem key={e.idequipo} value={e.idequipo.toString()}>
                {e.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth error={errores.idequipovisitante}>
          <InputLabel sx={{ color: "#000" }}>Equipo Visitante</InputLabel>
          <Select
            name="idequipovisitante"
            value={datos.idequipovisitante}
            label="Equipo Visitante"
            onChange={handleChange}
            disabled={!datos.jornada}
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
            {equiposDisponibles(datos.jornada)
              .filter((e) => e.idequipo.toString() !== datos.idequipolocal)
              .map((e) => (
                <MenuItem key={e.idequipo} value={e.idequipo.toString()}>
                  {e.nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Goles Local"
          type="number"
          name="goleslocal"
          value={datos.goleslocal}
          onChange={handleChange}
        />

        <TextField
          label="Goles Visitante"
          type="number"
          name="golesvisitante"
          value={datos.golesvisitante}
          onChange={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#000" }}>Estado</InputLabel>
          <Select
            name="estado"
            value={datos.estado}
            label="Estado"
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
            <MenuItem value="Programado">Programado</MenuItem>
            <MenuItem value="En curso">En curso</MenuItem>
            <MenuItem value="Finalizado">Finalizado</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">
          Aceptar
        </Button>
      </Stack>
    </Box>
  </Box>
);
};

export default AltaPartido;