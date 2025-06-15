import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaXTwitter } from "react-icons/fa6";
import FacebookIcon from "@mui/icons-material/Facebook";
import balon from "../assets/images/balon.jpeg";
import trofeoLiga from "../assets/images/trofeoLiga.jpg";
import letrasLiga from "../assets/images/letrasLaLiga.webp";
import fondo from "../assets/images/fondo_noticias.png";
import calendario from "../assets/images/calendario.png";
import clasificacion from "../assets/images/clasificacion.jpg";
import noticias from "../assets/images/noticias.jpeg";

const images = [
  {
    url: letrasLiga,
  },
  {
    url: trofeoLiga,
  },
  {
    url: balon,
  },
];

const cardData = [
  {
    title: "🗓️ Calendario De Partidos",
    description:
      "Consulta el calendario completo y nunca te pierdas el próximo partido de tu equipo favorito.",
    image: calendario,
    link: "/home/calendariopartidos",
  },
  {
    title: "📊 Clasificación Actual",
    description:
      "Descubre cómo va cada conjunto en la tabla esta temporada y prepárate para los momentos decisivos.",
    image: clasificacion,
    link: "/home/clasificacion",
  },
  {
    title: "📰 Noticias De Actualidad",
    description:
      "Mantente al día con las últimas novedades, rumores de fichajes y análisis exclusivos. ¡Todo lo que necesitas saber!",
    image: noticias,
    link: "/home/noticias",
  },
];

const CarruselPaginaPrincipal: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideInterval = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1)),
      slideInterval
    );
    return resetTimeout;
  }, [current, length]);

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${fondo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "65vh",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                left: `${(idx - current) * 100}%`,
                width: "100%",
                height: "100%",
                transition: "left 0.8s ease-in-out",
              }}
            >
              <Box
                component="img"
                src={img.url}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}

          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ChevronRight />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              right: 24,
              display: "flex",
              gap: 1,
            }}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setCurrent(idx)}
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor:
                    idx === current ? "primary.main" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            p: 4,
            width: "100%",
          }}
        >
          {cardData.map((card, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{
                width: { xs: "100%", sm: "45%", md: "30%" },
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#e31e1e",
                color: "#fff",
              }}
            >
              {card.image && (
                <Box
                  component="img"
                  src={card.image}
                  alt={card.title}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}

              <Box
                sx={{
                  p: 2,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    textAlign="center"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    component={Link}
                    to={card.link}
                    size="small"
                    variant="text"
                    endIcon={
                      <LaunchIcon fontSize="small" sx={{ color: "#fff" }} />
                    }
                    sx={{
                      textTransform: "none",
                      fontSize: "0.875rem",
                      p: 0,
                      color: "#fff",
                    }}
                  >
                    Ver más
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 4,
            py: 4,
            backgroundColor: "#ff6060",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "#fff",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            ¡Síguenos en Nuestras Redes Sociales!
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}
          >
            <MuiLink
              href="https://www.instagram.com/laliga/"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon fontSize="large" sx={{ color: "#E4405F" }} />
            </MuiLink>
            <MuiLink href="https://x.com/LaLiga" target="_blank" rel="noopener">
              <FaXTwitter size={32} color="black" />
            </MuiLink>
            <MuiLink
              href="https://www.facebook.com/profile.php?id=100044420049874"
              target="_blank"
              rel="noopener"
            >
              <FacebookIcon fontSize="large" sx={{ color: "#1877F2" }} />
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CarruselPaginaPrincipal;
