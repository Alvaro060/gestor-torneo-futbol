import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { apiUrl } from "../config";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import fondo1 from "../assets/images/fondo1.png";
import logo from "../assets/images/logo_borde_negro.png";

interface FormData {
  email: string;
  contrasena: string;
}

interface Errors {
  email?: string;
  contrasena?: string;
  apiError?: string;
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    contrasena: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.contrasena) {
      newErrors.contrasena = "La contraseña es obligatoria.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(apiUrl + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Inicio De Sesión Exitoso",
          text: "¡Bienvenido!",
          showConfirmButton: false,
          timer: 2000,
        });
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setErrors({ apiError: data.message || "Credenciales incorrectas." });
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
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${fondo1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <img
          src={logo}
          alt="Imagen Superior"
          style={{ maxWidth: "220px", width: "100%" }}
        />
      </Box>

      {/* Caja de formulario */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.61)",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          position: "relative",
        }}
      >
        {/* Botón volver arriba a la izquierda */}
        <Button
          variant="text"
          size="large"
          onClick={() => navigate("/home")}
          startIcon={<ArrowBack />}
          sx={{ position: "absolute", top: 8, left: 0 }}
        >
        </Button>

        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        {errors.apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.apiError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="contrasena"
            type={showPassword ? "text" : "password"}
            value={formData.contrasena}
            onChange={handleChange}
            error={!!errors.contrasena}
            helperText={errors.contrasena}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained">
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
