// src/components/NoticiasFutbol.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import LaunchIcon from "@mui/icons-material/Launch";
import { apiUrl } from "../config";
import logo from "../assets/images/logo.png";
import fondo from "../assets/images/fondo_noticias.png";

interface Noticia {
  title: string;
  pubDate: string;
  link: string;
  source: string;
  image?: string | null;
  description: string;
}

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  datos: T;
}

const logosMap: Record<string, string> = {
  "Real Madrid": "https://i.imgur.com/OnT3FyV.png",
  "FC Barcelona": "https://i.imgur.com/ntEyIgQ.png",
  Atlético: "https://i.imgur.com/2X1HsST.png",
  Sevilla: "https://i.imgur.com/OTY8bij.png",
  Valencia: "https://i.imgur.com/RZRHk0b.png",
  Villarreal: "https://i.imgur.com/kbyqcxb.png",
  "Real Sociedad": "https://i.imgur.com/KfAzONG.png",
  Betis: "https://i.imgur.com/LAYWqUO.png",
  Athletic: "https://i.imgur.com/VvtJS52.png",
  Osasuna: "https://i.imgur.com/WGe3xh4.png",
  Celta: "https://i.imgur.com/2Pbuun6.png",
  Mallorca: "https://i.imgur.com/QI9KvBN.png",
  Espanyol: "https://i.imgur.com/MprmiPT.png",
  Getafe: "https://i.imgur.com/OZ7xcB2.png",
  Alavés: "https://i.imgur.com/6DhEvxI.png",
  Girona: "https://i.imgur.com/YJ6v21B.png",
  "Real Valladolid": "https://i.imgur.com/jpLbptF.png",
  "Las Palmas": "https://i.imgur.com/bekjxg8.png",
  Leganés: "https://i.imgur.com/5LnXFxZ.png",
  "Rayo Vallecano": "https://i.imgur.com/OLF8bkA.png",
};

const NoticiasFutbol: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchNoticias = () => {
    setLoading(true);
    setErrorMsg(null);
    const qs = selectedTeam ? `?team=${encodeURIComponent(selectedTeam)}` : "";
    fetch(`${apiUrl}/noticias${qs}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data: ApiResponse<Noticia[]>) => {
        if (data.ok && Array.isArray(data.datos)) {
          setNoticias(data.datos);
        } else {
          throw new Error("Respuesta del servidor no válida.");
        }
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setErrorMsg("No se pudieron cargar las noticias. Por favor, inténtalo de nuevo.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNoticias();
  }, [selectedTeam]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          mb: 2,
          color: "#fff",
          fontWeight: 'bold',
          textShadow: "0 2px 4px rgba(0,0,0,0.9)",
        }}
      >
        📰 Últimas Noticias de La Liga
      </Typography>

      {/* Barra de escudos + logo "Todas" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          mb: 3,
          borderRadius: 2,
        }}
      >
        {Object.keys(logosMap).map((team) => (
          <IconButton
            key={team}
            onClick={() => setSelectedTeam(team)}
            disableRipple
            sx={{
              width: 56,
              height: 56,
              backgroundColor: "#fff",
              borderRadius: 1,
              p: 1,
              transform: selectedTeam === team ? "scale(1.25)" : "scale(1)",
              transition: "transform 0.3s ease-in-out",
              '&:hover': {
                transform: selectedTeam === team ? "scale(1.25)" : "scale(1)",
              }
            }}
          >
            <Box
              component="img"
              src={logosMap[team]}
              alt={team}
              sx={{ width: 40, height: 40, objectFit: "contain" }}
            />
          </IconButton>
        ))}

        <IconButton
          onClick={() => setSelectedTeam(null)}
          disableRipple
          sx={{
            width: 56,
            height: 56,
            backgroundColor: "#fff",
            borderRadius: 1,
            p: 1,
            transform: selectedTeam === null ? "scale(1.25)" : "scale(1)",
            transition: "transform 0.3s ease-in-out",
            '&:hover': {
              transform: selectedTeam === null ? "scale(1.25)" : "scale(1)",
            }
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Todas"
            sx={{ width: 40, height: 40, objectFit: "contain" }}
          />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : errorMsg ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, p: 2 }}>
          <Typography sx={{ mb: 2, color: "#fff" }}>
            {errorMsg}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon sx={{ color: "#fff" }} />}
            onClick={fetchNoticias}
            sx={{ textTransform: "none", color: "#fff", borderColor: "#fff" }}
          >
            Reintentar
          </Button>
        </Box>
      ) : noticias.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5, p: 2 }}>
          <Typography sx={{ mb: 2, color: "#fff" }}>
            No hay noticias disponibles para este filtro.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
          {noticias.map((noti, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                width: { xs: "100%", sm: "45%", md: "30%" },
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#e31e1e",
                color: "#fff"
              }}
            >
              {noti.image && (
                <Box component="img" src={noti.image} alt={noti.title} sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 1, mb: 2 }} />
              )}

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "#fff",
                  fontWeight: 'bold',
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {noti.title}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                {noti.description.length > 120
                  ? `${noti.description.substring(0, 120)}…`
                  : noti.description}
              </Typography>

              <Typography>
                {new Date(noti.pubDate).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>

              <Button
                component="a"
                href={noti.link}
                target="_blank"
                rel="noopener"
                size="small"
                variant="text"
                endIcon={<LaunchIcon fontSize="small" sx={{ color: "#fff" }} />}
                sx={{ mt: 2, textTransform: "none", fontSize: "0.875rem", p: 0, color: "#fff" }}
              >
                Leer más
              </Button>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NoticiasFutbol;