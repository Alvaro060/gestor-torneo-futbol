import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import img from "../assets/images/img404.png";

/**
 * Componente de página de error (sin menú ni layout alguno).
 */
const PaginaError: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const destino = token ? '/home' : '/';

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        No hemos encontrado la página que buscas
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <img
          src={img}
          alt="Error 404"
          style={{ maxWidth: '30%', height: 'auto' }}
        />
      </Box>
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate(destino)}
          sx={{ mt: 2 }}
        >
          Ir a la página principal
        </Button>
      </Box>
    </>
  );
};

export default PaginaError;
