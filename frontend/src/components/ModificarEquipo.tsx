import { Typography, TextField, Stack, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";
import Swal from "sweetalert2";
import fondo from "../assets/images/fondo_noticias.png";
/**
 * Componente para modificar un equipo existente.
 * @component
 * @returns {JSX.Element} JSX element del componente ModificarEquipo.
 */
function ModificarEquipo() {
  const params = useParams();
  const [datos, setDatos] = useState({
    idequipo: params.idequipo,
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

  useEffect(() => {
    async function getEquipoById() {
      let response = await fetch(apiUrl + "/equipos/" + datos.idequipo);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getEquipoById();
  }, [datos.idequipo, navigate]); // Dependencia de datos.idequipo

  /**
   * Maneja el envío del formulario.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(apiUrl + "/equipos/" + datos.idequipo, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
          credentials: "include",
        });

        if (response.ok) {
          // Usar SweetAlert2 para mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Equipo modificado con éxito.',
            confirmButtonText: 'Aceptar',
          });

          navigate(-1); // Volver a la ruta anterior
        } else {
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error);
      }
    }
  };

  /**
   * Valida los datos del formulario.
   * @returns {boolean} True si los datos son válidos, false en caso contrario.
   */
  function validarDatos() {
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
  }

  /**
   * Maneja el cambio en los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
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
      🛡️ Modificar equipo
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
          variant="outlined"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          error={validacion.nombre}
          helperText={validacion.nombre && "Nombre incorrecto. Mínimo 3 caracteres"}
        />
        <TextField
          label="País"
          variant="outlined"
          name="pais"
          value={datos.pais}
          onChange={handleChange}
          error={validacion.pais}
          helperText={validacion.pais && "País incorrecto. Mínimo 3 caracteres"}
        />
        <TextField
          label="Escudo (URL)"
          variant="outlined"
          name="escudo"
          value={datos.escudo}
          onChange={handleChange}
          error={validacion.escudo}
          helperText={validacion.escudo && "Escudo debe ser una URL válida de imagen"}
        />
        <TextField
          label="Año de Fundación"
          variant="outlined"
          name="fundacion"
          value={datos.fundacion}
          onChange={handleChange}
          error={validacion.fundacion}
          helperText={validacion.fundacion && "Fundación debe ser un año válido"}
        />
        <Button variant="contained" type="submit">
          Aceptar
        </Button>
      </Stack>
    </Box>
  </Box>
);

}

export default ModificarEquipo;
