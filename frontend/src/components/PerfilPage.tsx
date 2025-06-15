import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { apiUrl } from "../config";
import { CardMedia } from "@mui/material";
import fondo from "../assets/images/fondo_noticias.png";

interface PerfilPageProps {
  onLogout: () => void;
}

const PerfilPage: React.FC<PerfilPageProps> = ({ onLogout }) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/getUserByToken`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUsuario(data.user);
        setFormData(data.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/updateUser/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al actualizar el perfil");
      const result = await res.json();
      setUsuario(result.user || formData);
      setEditMode(false);

      // Mostrar SweetAlert y recargar
      Swal.fire({
        title: "Perfil actualizado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogoutClick = () => {
    Swal.fire({
      icon: "success",
      title: "¡Cierre De Sesión Exitoso!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      onLogout();
      window.location.reload();
    });
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );

  return (
    <Box
    sx={{
      minHeight: "100vh",
      backgroundImage: `url(${fondo})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      py: 5,
    }}
  >
      <Paper
        elevation={6}
        sx={{ p: 4, width: 360, borderRadius: 4, textAlign: "center" }}
      >
        {/* Avatar */}
        <CardMedia
          component="img"
          height="200"
          width="250"
          image={usuario.imagen_perfil || "https://via.placeholder.com/250x200"}
          alt={`Avatar de ${usuario.nombre}`}
          sx={{
            objectFit: "contain",
            marginBottom: "15px",
            boxShadow: 2,
            borderRadius: 3,
          }}
        />

        {editMode ? (
          <Stack spacing={2}>
            <TextField
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="imagen_perfil"
              label="URL Imagen"
              value={formData.imagen_perfil}
              onChange={handleChange}
            />
            <Button variant="contained" color="success" onClick={handleSave}>
              Guardar cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
          </Stack>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              {usuario.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {usuario.email}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setEditMode(true)}
            >
              Editar perfil
            </Button>
          </>
        )}

        {/* Aquí cambiamos onClick a handleLogoutClick */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          color="error"
          onClick={handleLogoutClick}
        >
          Cerrar sesión
        </Button>
      </Paper>
    </Box>
  );
};

export default PerfilPage;