// src/controllers/NoticiasController.js
const Respuesta = require("../utils/respuesta.js");
const { logMensaje } = require("../utils/logger.js");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const he = require("he");

const RSS_URL = "https://www.mundodeportivo.com/rss/futbol.xml";

// Diccionario de URLs de RSS por equipo
const RSS_FEEDS = {
  general: RSS_URL,
  "Real Madrid": "https://www.mundodeportivo.com/rss/futbol/real-madrid.xml",
  "FC Barcelona": "https://www.mundodeportivo.com/rss/futbol/fc-barcelona.xml",
  Atlético: "https://www.mundodeportivo.com/rss/futbol/atletico-madrid.xml",
  Sevilla: "https://www.mundodeportivo.com/rss/futbol/sevilla.xml",
  Valencia: "https://www.mundodeportivo.com/rss/futbol/valencia.xml",
  Villarreal: "https://www.mundodeportivo.com/rss/futbol/villarreal.xml",
  "Real Sociedad": "https://www.mundodeportivo.com/rss/futbol/real-sociedad.xml",
  Betis: "https://www.mundodeportivo.com/rss/futbol/betis.xml",
  Athletic: "https://www.mundodeportivo.com/rss/futbol/athletic-bilbao.xml",
  Osasuna: "https://www.mundodeportivo.com/rss/futbol/osasuna.xml",
  Celta: "https://www.mundodeportivo.com/rss/futbol/celta-vigo.xml",
  Mallorca: "https://www.mundodeportivo.com/rss/futbol/mallorca.xml",
  Espanyol: "https://www.mundodeportivo.com/rss/futbol/rcd-espanyol.xml",
  Getafe: "https://www.mundodeportivo.com/rss/futbol/getafe.xml",
  Alavés: "https://www.mundodeportivo.com/rss/futbol/alaves.xml",
  Girona: "https://www.mundodeportivo.com/rss/futbol/girona-fc.xml",
  "Real Valladolid": "https://www.mundodeportivo.com/rss/futbol/real-valladolid.xml",
  "Las Palmas": "https://www.mundodeportivo.com/rss/futbol/ud-las-palmas.xml",
  Leganés: "https://www.mundodeportivo.com/rss/futbol/leganes.xml",
  "Rayo Vallecano": "https://www.mundodeportivo.com/rss/futbol/rayo-vallecano.xml"
};

// Variantes textuales para identificar equipos dentro de título/desc
const TEAM_VARIANTS = {
  "Real Madrid": ["real madrid"],
  "FC Barcelona": ["fc barcelona", "barça", "barcelona"],
  Atlético: ["atlético", "atlético de madrid", "atleti"],
  Sevilla: ["sevilla"],
  Valencia: ["valencia"],
  Villarreal: ["villarreal"],
  "Real Sociedad": ["real sociedad"],
  Betis: ["betis", "real betis"],
  Athletic: ["athletic", "athletic club", "athletic de bilbao"],
  Osasuna: ["osasuna"],
  Celta: ["celta", "celta de vigo"],
  Mallorca: ["mallorca"],
  Espanyol: ["espanyol", "rcd espanyol"],
  Getafe: ["getafe"],
  Alavés: ["alavés", "deportivo alavés", "alaves"],
  Girona: ["girona"],
  "Real Valladolid": ["real valladolid", "valladolid"],
  "Las Palmas": ["las palmas"],
  Leganés: ["leganes", "leganés"],
  "Rayo Vallecano": ["rayo vallecano", "rayo"]
};

// Palabras clave que queremos evitar
const BLOQUEAR_POR_TEXTO = [
  "esports",
  "gaming",
  "league of legends",
  "superliga",
  "domino",
  "lol"
];

// Normaliza texto (quita tildes, pasa a minúsculas, elimina signos, etc.)
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "");
}

function contienePalabrasClave(texto) {
  const txt = normalize(texto);
  return BLOQUEAR_POR_TEXTO.some(palabra => txt.includes(palabra));
}

class NoticiasController {
  async getNoticias(req, res) {
    try {
      const teamFilter = req.query.team;
      const feedURL = teamFilter && RSS_FEEDS[teamFilter]
        ? RSS_FEEDS[teamFilter]
        : RSS_URL;

      const { data: xml } = await axios.get(feedURL, { timeout: 8000 });
      const json = await parseStringPromise(xml, { trim: true });
      const rssItems = json.rss?.channel?.[0]?.item || [];

      let items = rssItems.map(it => {
        const rawDesc = it.description?.[0] || "";
        const noTags = rawDesc.replace(/<[^>]*>/g, "");
        const cleanDesc = he.decode(noTags).trim();

        return {
          title:       it.title?.[0]       || "",
          description: cleanDesc,
          pubDate:     it.pubDate?.[0]     || "",
          link:        it.link?.[0]        || "",
          category:    it.category?.[0]    || "",
          image:       it.enclosure?.[0]?.$.url
                     || it["media:content"]?.[0]?.$.url
                     || null
        };
      });

      // ===== FILTRAR: solo fútbol masculino =====
      items = items.filter(it => {
        // Solo URLs de fútbol
        if (!it.link.includes("/futbol/")) return false;
        // Excluir sección fútbol femenino
        if (it.link.includes("/futbol/femenino") || normalize(it.category).includes("femenino")) return false;
        // Excluir esports/gaming
        const cat = normalize(it.category);
        if (cat.includes("esports") || cat.includes("gaming")) return false;
        // Excluir por palabras clave bloqueadas
        if (contienePalabrasClave(it.title) || contienePalabrasClave(it.description)) return false;

        // ===== AÑADIDO: si NO hay filtro de equipo, solo La Liga (equipos de TEAM_VARIANTS) =====
        if (!teamFilter) {
          const t = normalize(it.title);
          const d = normalize(it.description);

          // Buscamos si aparece al menos una de las variantes de algún equipo de La Liga
          const esEquipoLaLiga = Object.values(TEAM_VARIANTS)
            .flat()
            .some(variant => t.includes(variant) || d.includes(variant));

          if (!esEquipoLaLiga) {
            return false; // No es noticia de ningún equipo de La Liga
          }
        }

        // Si pedimos equipo y estamos en feed general, filtrado por variantes
        if (teamFilter && feedURL === RSS_URL) {
          const t2 = normalize(it.title);
          const d2 = normalize(it.description);
          const variants = TEAM_VARIANTS[teamFilter] || [];
          return variants.some(v => t2.includes(v) || d2.includes(v));
        }

        return true;
      });

      // Asignar source
      items = items.map(it => {
        if (teamFilter && feedURL !== RSS_URL) {
          return { ...it, source: teamFilter };
        }
        const t = normalize(it.title);
        const d = normalize(it.description);
        const source = Object.entries(TEAM_VARIANTS).find(([team, variants]) =>
          variants.some(v => t.includes(v) || d.includes(v))
        )?.[0] || "La Liga";
        return { ...it, source };
      });

      if (teamFilter && feedURL === RSS_URL) {
        items = items.filter(it => it.source === teamFilter);
      }

      // Ordenar y limitar
      const noticiasRecientes = items
        .filter(it => it.pubDate)
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 10);

      if (!noticiasRecientes.length) {
        return res
          .status(500)
          .json(Respuesta.error(null, "No se han encontrado noticias de la Primera División española"));
      }

      return res.json(
        Respuesta.exito(noticiasRecientes, "Últimas noticias de la Primera División española")
      );

    } catch (err) {
      logMensaje("Error al obtener noticias: " + err.message);
      console.error(err);
      return res
        .status(500)
        .json(Respuesta.error(null, "Error al recuperar noticias de la Primera División española"));
    }
  }
}

module.exports = new NoticiasController();
