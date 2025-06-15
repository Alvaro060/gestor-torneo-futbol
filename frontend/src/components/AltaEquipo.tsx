import { Typography, TextField, Stack, Button, Box } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";

interface EquipoData {
  nombre: string;
  pais: string;
  escudo: string;
  fundacion: string;
}

function AltaEquipo() {
  const [datos, setDatos] = useState<EquipoData>({
    nombre: "",
    pais: "",
    escudo: "",
    fundacion: "",
  });

  const [validacion, setValidacion] = useState({
    nombre: false,
    pais: false,
    escudo: false,
    fundacion: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(apiUrl + "/equipos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
          credentials: "include",
        });

        if (response.ok) {
          const respuesta = await response.json();
          if (respuesta.ok) {
            Swal.fire({
              icon: "success",
              title: "¡Éxito!",
              text: "Equipo creado con éxito.",
              confirmButtonText: "Aceptar",
            }).then(() => {
              navigate("/home");
            });
          } else {
            alert(respuesta.mensaje);
          }
        }
      } catch (error: unknown) {
        console.error("Error:", error);
        if (error instanceof Error) {
          alert("Error: " + error.message);
        } else {
          alert("Error desconocido");
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const validarDatos = () => {
    let validado = true;
    let validacionAux = {
      nombre: false,
      pais: false,
      escudo: false,
      fundacion: false,
    };

    if (datos.nombre.length < 3) {
      validacionAux.nombre = true;
      validado = false;
    }

    if (datos.pais.length < 3) {
      validacionAux.pais = true;
      validado = false;
    }

    if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(datos.escudo)) {
      validacionAux.escudo = true;
      validado = false;
    }

    if (!/^\d{4}$/.test(datos.fundacion)) {
      validacionAux.fundacion = true;
      validado = false;
    }

    setValidacion(validacionAux);
    return validado;
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
        ➕ Alta de Equipos
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
            helperText={
              validacion.nombre && "Nombre debe tener al menos 3 caracteres"
            }
          />
          <TextField
            label="País"
            variant="outlined"
            name="pais"
            value={datos.pais}
            onChange={handleChange}
            error={validacion.pais}
            helperText={
              validacion.pais && "País debe tener al menos 3 caracteres"
            }
          />
          <TextField
            label="Escudo (URL)"
            variant="outlined"
            name="escudo"
            value={datos.escudo}
            onChange={handleChange}
            error={validacion.escudo}
            helperText={
              validacion.escudo &&
              "Escudo debe ser una URL válida (jpg, jpeg, png, gif)"
            }
          />
          <TextField
            label="Año de Fundación"
            variant="outlined"
            name="fundacion"
            value={datos.fundacion}
            onChange={handleChange}
            error={validacion.fundacion}
            helperText={
              validacion.fundacion &&
              "Fundación debe ser un año válido (ej. 2025)"
            }
          />
          <Button variant="contained" type="submit">
            Aceptar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default AltaEquipo;
