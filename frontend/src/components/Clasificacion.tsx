import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { apiUrl } from "../config";
import fondo from "../assets/images/fondo_noticias.png";

export interface Partido {
  idpartido: number;
  fechahora: string;
  idequipolocal: number;
  idequipovisitante: number;
  goleslocal: number | null;
  golesvisitante: number | null;
  estado: "Programado" | "En curso" | "Finalizado";
  jornada: number;
}

export interface EquipoAPI {
  idequipo: number;
  nombre: string;
  escudo: string;
}

interface Equipo {
  idequipo: number;
  nombre: string;
  escudoUrl: string;
}

interface Stats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  gc: number;
  history: ("W" | "D" | "L")[];
  points: number;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 900,
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
}));

const StyledTableRow = styled(TableRow)<{ rank: number; total: number }>(
  ({ theme, rank, total }) => {
    let borderColor = theme.palette.divider;
    if (rank >= 1 && rank <= 4)
      borderColor = theme.palette.primary.main; 
    else if (rank >= 5 && rank <= 6)
      borderColor = theme.palette.warning.main; 
    else if (rank === 7)
      borderColor = theme.palette.success.main; 
    else if (rank > total - 3) borderColor = theme.palette.error.main;
    return {
      "& td:first-of-type": {
        borderLeft: `4px solid ${borderColor}`,
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    };
  }
);

const BoldCell = styled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: "1rem",
}));

const ResultIcon = styled(Box)<{ result: string }>(({ theme, result }) => {
  const size = 24;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    borderRadius: "50%",
    fontSize: 14,
    color: theme.palette.common.white,
    margin: "0 2px",
  };
  if (result === "W")
    return { ...base, backgroundColor: theme.palette.success.main };
  if (result === "D")
    return { ...base, backgroundColor: theme.palette.grey[500] };
  return { ...base, backgroundColor: theme.palette.error.main };
});

const Clasificacion: React.FC = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [equiposInfo, setEquiposInfo] = useState<Record<number, Equipo>>({});
  const [stats, setStats] = useState<Record<number, Stats>>({});
  const [searchJornada, setSearchJornada] = useState<number | "">("");

  useEffect(() => {
    (async () => {
      try {
        const [pRes, eRes] = await Promise.all([
          fetch(`${apiUrl}/partidos`),
          fetch(`${apiUrl}/equipos`),
        ]);
        const pData = await pRes.json();
        const eData = await eRes.json();
        if (pData.ok) setPartidos(pData.datos);
        if (eData.ok) {
          const map: Record<number, Equipo> = {};
          eData.datos.forEach((raw: EquipoAPI) => {
            map[raw.idequipo] = {
              idequipo: raw.idequipo,
              nombre: raw.nombre,
              escudoUrl: raw.escudo,
            };
          });
          setEquiposInfo(map);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    const filtered = partidos.filter(
      (p) =>
        p.estado === "Finalizado" &&
        p.goleslocal != null &&
        p.golesvisitante != null &&
        (searchJornada === "" ? true : p.jornada <= searchJornada)
    );
    const s: Record<number, Stats> = {};
    Object.keys(equiposInfo).forEach((id) => {
      s[Number(id)] = {
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        gc: 0,
        history: [],
        points: 0,
      };
    });
    filtered.forEach((p) => {
      const { idequipolocal, idequipovisitante, goleslocal, golesvisitante } =
        p;
      const home = s[idequipolocal];
      const away = s[idequipovisitante];
      home.played++;
      away.played++;
      home.gf += goleslocal!;
      home.gc += golesvisitante!;
      away.gf += golesvisitante!;
      away.gc += goleslocal!;
      if (goleslocal! > golesvisitante!) {
        home.wins++;
        home.points += 3;
        home.history.push("W");
        away.losses++;
        away.history.push("L");
      } else if (goleslocal! === golesvisitante!) {
        home.draws++;
        home.points++;
        home.history.push("D");
        away.draws++;
        away.points++;
        away.history.push("D");
      } else {
        away.wins++;
        away.points += 3;
        away.history.push("W");
        home.losses++;
        home.history.push("L");
      }
    });
    setStats(s);
  }, [partidos, equiposInfo, searchJornada]);

  const jornadas = Array.from(new Set(partidos.map((p) => p.jornada))).sort(
    (a, b) => a - b
  );

  
  const orden = Object.keys(stats)
    .map(Number)
    .sort((a, b) => {
      const diffPts = stats[b].points - stats[a].points;
      if (diffPts !== 0) return diffPts;

      const direct = partidos.filter(
        (p) =>
          p.estado === "Finalizado" &&
          p.goleslocal != null &&
          p.golesvisitante != null &&
          ((p.idequipolocal === a && p.idequipovisitante === b) ||
            (p.idequipolocal === b && p.idequipovisitante === a)) &&
          (searchJornada === "" ? true : p.jornada <= searchJornada)
      );

      let hA = 0,
        hB = 0,
        gfA = 0,
        gcA = 0,
        gfB = 0,
        gcB = 0;

      direct.forEach((p) => {
        const isHomeA = p.idequipolocal === a;
        const goalsA = isHomeA ? p.goleslocal! : p.golesvisitante!;
        const goalsB = isHomeA ? p.golesvisitante! : p.goleslocal!;
        gfA += goalsA;
        gcA += goalsB;
        gfB += goalsB;
        gcB += goalsA;
        if (goalsA > goalsB) hA += 3;
        else if (goalsA === goalsB) {
          hA++;
          hB++;
        } else hB += 3;
      });

      const diffHeadPts = hB - hA;
      if (diffHeadPts !== 0) return diffHeadPts;

      const diffHeadGD = gfB - gcB - (gfA - gcA);
      if (diffHeadGD !== 0) return diffHeadGD;

      const totalGD_A = stats[a].gf - stats[a].gc;
      const totalGD_B = stats[b].gf - stats[b].gc;
      const diffTotalGD = totalGD_B - totalGD_A;
      if (diffTotalGD !== 0) return diffTotalGD;

      return stats[b].gf - stats[a].gf;
    });

  const total = orden.length;

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
        📊 Clasificación General
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: "#fff" }}>Filtrar por Jornada</InputLabel>
        <Select
          value={searchJornada}
          label="Filtrar por Jornada"
          onChange={(e) => setSearchJornada(e.target.value as number | "")}
          sx={{
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.7)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {jornadas.map((j) => (
            <MenuItem key={j} value={j}>
              Jornada {j}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer
        component={StyledPaper}
        sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <Table>
          <TableHead
            sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
          >
            <TableRow>
              <TableCell align="center">Pos</TableCell>
              <TableCell>Equipo</TableCell>
              <TableCell align="center">PJ</TableCell>
              <TableCell align="center">PG</TableCell>
              <TableCell align="center">PE</TableCell>
              <TableCell align="center">PP</TableCell>
              <TableCell align="center">Pts</TableCell>
              <TableCell align="center">GF</TableCell>
              <TableCell align="center">GC</TableCell>
              <TableCell align="center">Últimos 5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orden.map((id, idx) => {
              const t = stats[id];
              const rank = idx + 1;
              return (
                <StyledTableRow key={id} rank={rank} total={total}>
                  <TableCell align="center">{rank}</TableCell>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      variant="square"
                      src={equiposInfo[id].escudoUrl}
                      alt={equiposInfo[id].nombre}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        "& img": {
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        },
                      }}
                    >
                      {equiposInfo[id].nombre.charAt(0)}
                    </Avatar>
                    <Typography sx={{ ml: 1 }}>
                      {equiposInfo[id].nombre}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{t.played}</TableCell>
                  <TableCell align="center">{t.wins}</TableCell>
                  <TableCell align="center">{t.draws}</TableCell>
                  <TableCell align="center">{t.losses}</TableCell>
                  <BoldCell align="center">{t.points}</BoldCell>
                  <TableCell align="center">{t.gf}</TableCell>
                  <TableCell align="center">{t.gc}</TableCell>
                  <TableCell align="center">
                    {t.history.slice(-5).map((r, i) => (
                      <ResultIcon key={i} result={r}>
                        {r === "W" ? "✓" : r === "D" ? "–" : "✗"}
                      </ResultIcon>
                    ))}
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Clasificacion;
