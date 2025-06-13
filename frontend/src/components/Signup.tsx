import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Link } from "@mui/material";
import { apiUrl } from "../config";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

/**
 * Definición de los tipos de datos para el formulario
 */
interface FormData {
  nombre: string;
  email: string;
  contrasena: string;
  confirmPassword: string;
}

interface Errors {
  nombre?: string;
  email?: string;
  contrasena?: string;
  confirmPassword?: string;
  apiError?: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    contrasena: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre de usuario es obligatorio.";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria.";
    } else if (formData.contrasena.length < 4) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (formData.contrasena !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(apiUrl + "/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          contrasena: formData.contrasena,
        }),
      });

      if (response.ok) {
        // Limpiar el formulario y los errores
        setFormData({
          nombre: "",
          email: "",
          contrasena: "",
          confirmPassword: "",
        });
        setErrors({});

        // Mostrar el SweetAlert de éxito
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente.",
          confirmButtonText: "Iniciar sesión",
        }).then(() => {
          navigate("/"); // Redirigir al login después de hacer clic en el botón
        });
      } else {
        const data = await response.json();
        setErrors({
          apiError: data.mensaje || "Error al registrar el usuario.",
        });
      }
    } catch (error) {
      setErrors({ apiError: "Error de red. Inténtalo de nuevo más tarde." });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 2,
          borderRadius: 2,
          p: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>

        {errors.apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.apiError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            error={!!errors.contrasena}
            helperText={errors.contrasena}
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button type="submit" fullWidth variant="contained">
            Registrar
          </Button>
          <Typography variant="body2" align="center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/" variant="body2">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;