-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 13-06-2025 a las 15:00:47
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `GestorTorneoFutbol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `idequipo` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `escudo` varchar(255) NOT NULL,
  `fundacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`idequipo`, `nombre`, `pais`, `escudo`, `fundacion`) VALUES
(1, 'Sevilla Fútbol Club', 'España', 'https://i.imgur.com/OTY8bij.png', 1890),
(2, 'Fútbol Club Barcelona', 'España', 'https://i.imgur.com/ntEyIgQ.png', 1899),
(3, 'Athletic Club', 'España', 'https://i.imgur.com/VvtJS52.png', 1898),
(4, 'Atlético de Madrid', 'España', 'https://i.imgur.com/2X1HsST.png', 1903),
(5, 'Club Atlético Osasuna', 'España', 'https://i.imgur.com/WGe3xh4.png', 1920),
(6, 'Club Deportivo Leganés', 'España', 'https://i.imgur.com/5LnXFxZ.png', 1928),
(7, 'Deportivo Alavés', 'España', 'https://i.imgur.com/6DhEvxI.png', 1921),
(8, 'Getafe Club de Fútbol', 'España', 'https://i.imgur.com/OZ7xcB2.png', 1983),
(9, 'Girona Fútbol Club', 'España', 'https://i.imgur.com/YJ6v21B.png', 1930),
(10, 'Rayo Vallecano', 'España', 'https://i.imgur.com/OLF8bkA.png', 1924),
(11, 'Real Club Celta de Vigo', 'España', 'https://i.imgur.com/2Pbuun6.png', 1923),
(12, 'RCD Espanyol de Barcelona', 'España', 'https://i.imgur.com/MprmiPT.png', 1900),
(13, 'Real Club Deportivo Mallorca', 'España', 'https://i.imgur.com/QI9KvBN.png', 1916),
(14, 'Real Betis Balonpié', 'España', 'https://i.imgur.com/LAYWqUO.png', 1907),
(15, 'Real Madrid Club de Fútbol', 'España', 'https://i.imgur.com/OnT3FyV.png', 1902),
(16, 'Real Sociedad de Fútbol', 'España', 'https://i.imgur.com/KfAzONG.png', 1909),
(17, 'Real Valladolid Club de Fútbol', 'España', 'https://i.imgur.com/jpLbptF.png', 1928),
(18, 'Unión Deportiva Las Palmas', 'España', 'https://i.imgur.com/bekjxg8.png', 1949),
(19, 'Valencia Club de Fútbol', 'España', 'https://i.imgur.com/RZRHk0b.png', 1919),
(20, 'Villarreal Club de Fútbol', 'España', 'https://i.imgur.com/kbyqcxb.png', 1923);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `idjugador` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `posicion` varchar(30) NOT NULL,
  `edad` int NOT NULL,
  `fincontrato` date NOT NULL,
  `idequipo` int DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`idjugador`, `nombre`, `apellido`, `posicion`, `edad`, `fincontrato`, `idequipo`) VALUES
(11, 'Ørjan', 'Nyland', 'Portero', 34, '2025-06-30', 1),
(12, 'Loïc', 'Badé', 'Defensa', 25, '2027-06-30', 1),
(13, 'Saúl', 'Ñíguez', 'Mediocentro', 30, '2026-06-30', 1),
(14, 'Isaac', 'Romero', 'Delantero', 24, '2025-06-30', 1),
(15, 'Dodi', 'Lukebakio', 'Delantero', 27, '2028-06-30', 1),
(16, 'Marc-André', 'ter Stegen', 'Portero', 33, '2028-06-30', 2),
(17, 'Ronald', 'Araújo', 'Defensa', 26, '2026-06-30', 2),
(18, 'Frenkie', 'de Jong', 'Mediocentro', 28, '2026-06-30', 2),
(19, 'Pedri', 'González', 'Mediocentro', 22, '2026-06-30', 2),
(20, 'Robert', 'Lewandowski', 'Delantero', 36, '2026-06-30', 2),
(21, 'Unai', 'Simón', 'Portero', 27, '2025-06-30', 3),
(22, 'Dani', 'Vivian', 'Defensa', 25, '2026-06-30', 3),
(23, 'Iñigo', 'Ruiz de Galarreta', 'Mediocentro', 30, '2025-06-30', 3),
(24, 'Nico', 'Williams', 'Delantero', 22, '2027-06-30', 3),
(25, 'Iñaki', 'Williams', 'Delantero', 30, '2028-06-30', 3),
(26, 'Jan', 'Oblak', 'Portero', 31, '2026-06-30', 4),
(27, 'José María', 'Giménez', 'Defensa', 29, '2028-06-30', 4),
(28, 'Koke', 'Resurrección', 'Mediocentro', 31, '2026-06-30', 4),
(29, 'Giuliano', 'Simeone', 'Delantero', 23, '2027-06-30', 4),
(30, 'Antoine', 'Griezmann', 'Delantero', 32, '2026-06-30', 4),
(31, 'Sergio', 'Herrera', 'Portero', 33, '2026-06-30', 5),
(32, 'Jesús', 'Areso', 'Defensa', 25, '2027-06-30', 5),
(33, 'Aimar', 'Oroz', 'Mediocentro', 24, '2025-06-30', 5),
(34, 'Alejandro', 'Catena', 'Defensa', 31, '2025-06-30', 5),
(35, 'Abel', 'Bretones', 'Delantero', 26, '2026-06-30', 5),
(36, 'Renato', 'Tapia', 'Mediocentro', 29, '2025-06-30', 6),
(37, 'Dani', 'Raba', 'Delantero', 31, '2025-06-30', 6),
(38, 'Juan', 'Cruz', 'Defensa', 31, '2026-06-30', 6),
(39, 'Óscar', 'Rodríguez', 'Delantero', 27, '2026-06-30', 6),
(40, 'Valentín', 'Rosier', 'Defensa', 27, '2025-06-30', 6),
(41, 'Antonio', 'Sivera', 'Portero', 28, '2027-06-30', 7),
(42, 'Abdel', 'Abqar', 'Defensa', 26, '2025-06-30', 7),
(43, 'Nahuel', 'Tenaglia', 'Defensa', 29, '2027-06-30', 7),
(44, 'Antonio', 'Blanco', 'Mediocentro', 24, '2027-06-30', 7),
(45, 'Carlos', 'Vicente', 'Delantero', 23, '2025-06-30', 7),
(46, 'David', 'Soria', 'Portero', 32, '2026-06-30', 8),
(47, 'Luis', 'Milla', 'Mediocentro', 29, '2026-06-30', 8),
(48, 'Omar', 'Alderete', 'Defensa', 28, '2028-06-30', 8),
(49, 'Mauro', 'Arambarri', 'Mediocentro', 29, '2028-06-30', 8),
(50, 'Borja', 'Mayoral', 'Delantero', 28, '2027-06-30', 8),
(51, 'Paulo', 'Gazzaniga', 'Portero', 32, '2027-06-30', 9),
(52, 'Daley', 'Blind', 'Defensa', 34, '2026-06-30', 9),
(53, 'Miguel', 'Gutiérrez', 'Defensa', 23, '2027-06-30', 9),
(54, 'Cristian', 'Portugés', 'Delantero', 32, '2026-06-30', 9),
(55, 'Cristhian', 'Stuani', 'Delantero', 37, '2025-06-30', 9),
(56, 'Augusto', 'Batalla', 'Portero', 28, '2028-06-30', 10),
(57, 'Gerard', 'Gumbau', 'Mediocentro', 30, '2025-06-30', 10),
(58, 'Pedro', 'Díaz', 'Mediocentro', 27, '2027-06-30', 10),
(59, 'Andrei', 'Ratiu', 'Defensa', 26, '2028-06-30', 10),
(60, 'Óscar', 'Trejo', 'Mediocentro', 37, '2025-06-30', 10),
(61, 'Iván', 'Villar', 'Portero', 26, '2026-06-30', 11),
(62, 'Óscar', 'Mingueza', 'Defensa', 25, '2027-06-30', 11),
(63, 'Marcos', 'Alonso', 'Defensa', 33, '2025-06-30', 11),
(64, 'Borja', 'Iglesias', 'Delantero', 31, '2025-06-30', 11),
(65, 'Iago', 'Aspas', 'Delantero', 36, '2025-06-30', 11),
(66, 'Joan', 'García', 'Portero', 24, '2028-06-30', 12),
(67, 'Omar', 'El Hilali', 'Defensa', 21, '2027-06-30', 12),
(68, 'Álex', 'Král', 'Mediocentro', 27, '2025-06-30', 12),
(69, 'Roberto', 'Fernández', 'Delantero', 22, '2028-06-30', 12),
(70, 'Javi', 'Puado', 'Delantero', 27, '2025-06-30', 12),
(71, 'Leo', 'Román', 'Portero', 23, '2026-06-30', 13),
(72, 'Antonio', 'Raíllo', 'Defensa', 36, '2026-06-30', 13),
(73, 'Vedat', 'Muriqi', 'Delantero', 29, '2026-06-30', 13),
(74, 'Sergi', 'Darder', 'Mediocentro', 30, '2025-06-30', 13),
(75, 'Samu', 'Costa', 'Mediocentro', 28, '2025-06-30', 13),
(76, 'Adrián', 'San Miguel', 'Portero', 35, '2025-06-30', 14),
(77, 'Isco', 'Alarcón', 'Mediocentro', 31, '2026-06-30', 14),
(78, 'Jesús', 'Rodríguez', 'Delantero', 23, '2025-06-30', 14),
(79, 'Abde', 'Ezzalzouli', 'Delantero', 23, '2026-06-30', 14),
(80, 'Johnny', 'Cardoso', 'Mediocentro', 23, '2027-06-30', 14),
(81, 'Thibaut', 'Courtois', 'Portero', 31, '2026-06-30', 15),
(82, 'Éder', 'Militão', 'Defensa', 26, '2028-06-30', 15),
(83, 'Luka', 'Modrić', 'Mediocentro', 38, '2025-06-30', 15),
(84, 'Vinícius', 'Júnior', 'Delantero', 24, '2027-06-30', 15),
(85, 'Rodrygo', 'Goes', 'Delantero', 23, '2027-06-30', 15),
(86, 'Alex', 'Remiro', 'Portero', 28, '2027-06-30', 16),
(87, 'Aihen', 'Muñoz', 'Defensa', 27, '2025-06-30', 16),
(88, 'Nayef', 'Aguerd', 'Defensa', 28, '2027-06-30', 16),
(89, 'Jon', 'Aramburu', 'Defensa', 24, '2026-06-30', 16),
(90, 'Takefusa', 'Kubo', 'Delantero', 24, '2027-06-30', 16),
(91, 'Karl', 'Hein', 'Portero', 22, '2027-06-30', 17),
(92, 'Juanmi', 'Latasa', 'Delantero', 22, '2026-06-30', 17),
(93, 'Raúl', 'Moro', 'Delantero', 20, '2026-06-30', 17),
(94, 'Darwin', 'Machís', 'Delantero', 32, '2025-06-30', 17),
(95, 'David', 'Torres', 'Defensa', 27, '2027-06-30', 17),
(96, 'Jasper', 'Cillessen', 'Portero', 33, '2026-06-30', 18),
(97, 'Alberto', 'Moleiro', 'Mediocentro', 21, '2027-06-30', 18),
(98, 'Sandro', 'Ramírez', 'Delantero', 28, '2025-06-30', 18),
(99, 'Fabio', 'Silva', 'Delantero', 23, '2027-06-30', 18),
(100, 'Mika', 'Mármol', 'Defensa', 22, '2026-06-30', 18),
(101, 'Giorgi', 'Marmardashvili', 'Portero', 22, '2027-06-30', 19),
(102, 'Cristian', 'Mosquera', 'Defensa', 21, '2027-06-30', 19),
(103, 'José', 'Gayà', 'Defensa', 28, '2027-06-30', 19),
(104, 'Hugo', 'Duro', 'Delantero', 25, '2026-06-30', 19),
(105, 'Luis', 'Rioja', 'Mediocentro', 24, '2027-06-30', 19),
(106, 'Diego', 'Conde', 'Portero', 22, '2027-06-30', 20),
(107, 'Álex', 'Baena', 'Mediocentro', 22, '2027-06-30', 20),
(108, 'Ayoze', 'Pérez', 'Delantero', 31, '2026-06-30', 20),
(109, 'Dani', 'Parejo', 'Mediocentro', 35, '2025-06-30', 20),
(110, 'Juan', 'Foyth', 'Defensa', 26, '2027-06-30', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `idpartido` int NOT NULL,
  `fechahora` datetime DEFAULT NULL,
  `idequipolocal` int DEFAULT NULL,
  `idequipovisitante` int DEFAULT NULL,
  `goleslocal` int DEFAULT NULL,
  `golesvisitante` int DEFAULT NULL,
  `estado` enum('Programado','En curso','Finalizado') DEFAULT NULL,
  `jornada` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`idpartido`, `fechahora`, `idequipolocal`, `idequipovisitante`, `goleslocal`, `golesvisitante`, `estado`, `jornada`) VALUES
(23, '2024-08-15 20:00:00', 3, 8, 1, 1, 'Finalizado', 1),
(24, '2024-08-15 22:00:00', 14, 9, 1, 1, 'Finalizado', 1),
(25, '2024-08-16 18:30:00', 11, 7, 2, 1, 'Finalizado', 1),
(26, '2024-08-16 21:00:00', 18, 1, 2, 2, 'Finalizado', 1),
(27, '2024-08-17 19:00:00', 5, 6, 1, 1, 'Finalizado', 1),
(28, '2024-08-17 21:30:00', 19, 2, 1, 2, 'Finalizado', 1),
(29, '2024-08-18 20:00:00', 16, 10, 1, 2, 'Finalizado', 1),
(30, '2024-08-18 22:00:00', 13, 15, 1, 1, 'Finalizado', 1),
(31, '2024-08-19 18:00:00', 17, 12, 1, 0, 'Finalizado', 1),
(32, '2024-08-19 20:30:00', 20, 4, 2, 2, 'Finalizado', 1),
(403, '2024-08-23 20:00:00', 11, 19, 3, 1, 'Finalizado', 2),
(404, '2024-08-23 22:00:00', 1, 20, 1, 2, 'Finalizado', 2),
(405, '2024-08-24 18:30:00', 5, 13, 1, 0, 'Finalizado', 2),
(406, '2024-08-24 21:00:00', 2, 3, 2, 1, 'Finalizado', 2),
(407, '2024-08-24 23:00:00', 8, 10, 0, 0, 'Finalizado', 2),
(408, '2024-08-25 18:00:00', 12, 16, 0, 1, 'Finalizado', 2),
(409, '2024-08-25 20:30:00', 15, 17, 3, 0, 'Finalizado', 2),
(410, '2024-08-25 22:30:00', 6, 18, 2, 1, 'Finalizado', 2),
(411, '2024-08-26 18:00:00', 7, 14, 0, 0, 'Finalizado', 2),
(412, '2024-08-26 20:30:00', 4, 9, 3, 0, 'Finalizado', 2),
(413, '2024-08-26 20:00:00', 20, 11, 4, 3, 'Finalizado', 3),
(414, '2024-08-27 18:00:00', 13, 1, 0, 0, 'Finalizado', 3),
(415, '2024-08-27 20:30:00', 10, 2, 1, 2, 'Finalizado', 3),
(416, '2024-08-28 19:00:00', 3, 19, 1, 0, 'Finalizado', 3),
(417, '2024-08-28 21:00:00', 17, 6, 0, 0, 'Finalizado', 3),
(418, '2024-08-29 18:00:00', 4, 12, 0, 0, 'Finalizado', 3),
(419, '2024-08-29 20:30:00', 16, 7, 1, 2, 'Finalizado', 3),
(420, '2024-08-30 19:00:00', 9, 5, 4, 0, 'Finalizado', 3),
(421, '2024-08-30 21:30:00', 18, 15, 1, 1, 'Finalizado', 3),
(422, '2024-08-31 19:00:00', 14, 8, 2, 1, 'Finalizado', 3),
(423, '2024-08-31 18:30:00', 2, 17, 7, 0, 'Finalizado', 4),
(424, '2024-08-31 21:00:00', 3, 4, 0, 1, 'Finalizado', 4),
(425, '2024-09-01 14:00:00', 12, 10, 2, 1, 'Finalizado', 4),
(426, '2024-09-01 16:15:00', 6, 13, 0, 1, 'Finalizado', 4),
(427, '2024-09-01 18:30:00', 19, 20, 1, 1, 'Finalizado', 4),
(428, '2024-09-01 21:00:00', 5, 11, 3, 2, 'Finalizado', 4),
(429, '2024-09-02 14:00:00', 7, 18, 2, 0, 'Finalizado', 4),
(430, '2024-09-02 16:15:00', 1, 9, 0, 2, 'Finalizado', 4),
(431, '2024-09-02 18:30:00', 8, 16, 0, 0, 'Finalizado', 4),
(432, '2024-09-02 21:00:00', 15, 14, 2, 0, 'Finalizado', 4),
(433, '2024-09-13 18:30:00', 14, 6, 2, 0, 'Finalizado', 5),
(434, '2024-09-13 21:00:00', 13, 20, 1, 2, 'Finalizado', 5),
(435, '2024-09-14 14:00:00', 12, 7, 3, 2, 'Finalizado', 5),
(436, '2024-09-14 16:15:00', 1, 8, 1, 0, 'Finalizado', 5),
(437, '2024-09-14 18:30:00', 16, 15, 0, 2, 'Finalizado', 5),
(438, '2024-09-14 21:00:00', 11, 17, 3, 1, 'Finalizado', 5),
(439, '2024-09-15 14:00:00', 9, 2, 1, 4, 'Finalizado', 5),
(440, '2024-09-15 16:15:00', 18, 3, 2, 3, 'Finalizado', 5),
(441, '2024-09-15 18:30:00', 4, 19, 3, 0, 'Finalizado', 5),
(442, '2024-09-15 21:00:00', 10, 5, 3, 1, 'Finalizado', 5),
(443, '2024-09-20 18:30:00', 7, 1, 2, 1, 'Finalizado', 6),
(444, '2024-09-20 21:00:00', 17, 16, 0, 0, 'Finalizado', 6),
(445, '2024-09-21 14:00:00', 5, 18, 2, 1, 'Finalizado', 6),
(446, '2024-09-21 16:15:00', 19, 9, 2, 0, 'Finalizado', 6),
(447, '2024-09-21 18:30:00', 15, 12, 4, 1, 'Finalizado', 6),
(448, '2024-09-21 21:00:00', 8, 6, 1, 1, 'Finalizado', 6),
(449, '2024-09-22 14:00:00', 3, 11, 3, 1, 'Finalizado', 6),
(450, '2024-09-22 16:15:00', 20, 2, 1, 5, 'Finalizado', 6),
(451, '2024-09-22 18:30:00', 10, 4, 1, 1, 'Finalizado', 6),
(452, '2024-09-22 21:00:00', 14, 13, 1, 2, 'Finalizado', 6),
(453, '2024-09-17 18:30:00', 13, 16, 1, 0, 'Finalizado', 7),
(454, '2024-09-17 21:00:00', 6, 3, 0, 2, 'Finalizado', 7),
(455, '2024-09-18 18:30:00', 1, 17, 2, 1, 'Finalizado', 7),
(456, '2024-09-18 21:00:00', 19, 5, 0, 0, 'Finalizado', 7),
(457, '2024-09-19 18:30:00', 15, 7, 3, 2, 'Finalizado', 7),
(458, '2024-09-19 21:00:00', 9, 10, 0, 0, 'Finalizado', 7),
(459, '2024-09-20 18:30:00', 2, 8, 1, 0, 'Finalizado', 7),
(460, '2024-09-20 21:00:00', 12, 20, 1, 2, 'Finalizado', 7),
(461, '2024-09-21 18:30:00', 18, 14, 1, 1, 'Finalizado', 7),
(462, '2024-09-21 21:00:00', 11, 4, 0, 1, 'Finalizado', 7),
(463, '2024-09-27 18:30:00', 17, 13, 1, 2, 'Finalizado', 8),
(464, '2024-09-27 21:00:00', 8, 7, 2, 0, 'Finalizado', 8),
(465, '2024-09-28 14:00:00', 10, 6, 1, 1, 'Finalizado', 8),
(466, '2024-09-28 16:15:00', 16, 19, 3, 0, 'Finalizado', 8),
(467, '2024-09-28 18:30:00', 5, 2, 4, 2, 'Finalizado', 8),
(468, '2024-09-28 21:00:00', 11, 9, 1, 1, 'Finalizado', 8),
(469, '2024-09-29 14:00:00', 3, 1, 1, 1, 'Finalizado', 8),
(470, '2024-09-29 16:15:00', 14, 12, 1, 0, 'Finalizado', 8),
(471, '2024-09-29 18:30:00', 4, 15, 1, 1, 'Finalizado', 8),
(472, '2024-09-30 21:00:00', 20, 18, 3, 1, 'Finalizado', 8),
(473, '2024-10-04 18:30:00', 6, 19, 0, 0, 'Finalizado', 9),
(474, '2024-10-04 21:00:00', 12, 13, 2, 1, 'Finalizado', 9),
(475, '2024-10-05 14:00:00', 8, 5, 1, 1, 'Finalizado', 9),
(476, '2024-10-05 16:15:00', 18, 11, 0, 1, 'Finalizado', 9),
(477, '2024-10-05 18:30:00', 17, 10, 1, 2, 'Finalizado', 9),
(478, '2024-10-05 21:00:00', 15, 20, 2, 0, 'Finalizado', 9),
(479, '2024-10-06 14:00:00', 9, 3, 2, 1, 'Finalizado', 9),
(480, '2024-10-06 16:15:00', 7, 2, 0, 3, 'Finalizado', 9),
(481, '2024-10-06 18:30:00', 1, 14, 1, 0, 'Finalizado', 9),
(482, '2024-10-06 21:00:00', 16, 4, 1, 1, 'Finalizado', 9),
(483, '2024-10-18 18:30:00', 7, 17, 2, 3, 'Finalizado', 10),
(484, '2024-10-18 21:00:00', 3, 12, 4, 1, 'Finalizado', 10),
(485, '2024-10-19 14:00:00', 5, 14, 1, 2, 'Finalizado', 10),
(486, '2024-10-19 16:15:00', 9, 16, 0, 1, 'Finalizado', 10),
(487, '2024-10-19 18:30:00', 11, 15, 1, 2, 'Finalizado', 10),
(488, '2024-10-19 21:00:00', 13, 10, 1, 0, 'Finalizado', 10),
(489, '2024-10-20 14:00:00', 4, 6, 3, 1, 'Finalizado', 10),
(490, '2024-10-20 16:15:00', 20, 8, 1, 1, 'Finalizado', 10),
(491, '2024-10-20 18:30:00', 2, 1, 5, 1, 'Finalizado', 10),
(492, '2024-10-21 21:00:00', 19, 18, 2, 3, 'Finalizado', 10),
(493, '2024-10-25 18:30:00', 12, 1, 0, 2, 'Finalizado', 11),
(494, '2024-10-25 21:00:00', 17, 20, 1, 2, 'Finalizado', 11),
(495, '2024-10-26 14:00:00', 10, 7, 1, 0, 'Finalizado', 11),
(496, '2024-10-26 16:15:00', 18, 9, 1, 0, 'Finalizado', 11),
(497, '2024-10-26 18:30:00', 15, 2, 0, 4, 'Finalizado', 11),
(498, '2024-10-26 21:00:00', 6, 11, 3, 0, 'Finalizado', 11),
(499, '2024-10-27 14:00:00', 8, 19, 1, 1, 'Finalizado', 11),
(500, '2024-10-27 16:15:00', 14, 4, 1, 0, 'Finalizado', 11),
(501, '2024-10-27 18:30:00', 16, 5, 0, 2, 'Finalizado', 11),
(502, '2024-10-28 21:00:00', 13, 3, 0, 0, 'Finalizado', 11),
(503, '2024-11-01 18:30:00', 7, 13, 1, 0, 'Finalizado', 12),
(504, '2024-11-01 21:00:00', 5, 17, 1, 0, 'Finalizado', 12),
(505, '2024-11-02 14:00:00', 9, 6, 4, 3, 'Finalizado', 12),
(506, '2024-11-02 16:15:00', 4, 18, 2, 0, 'Finalizado', 12),
(507, '2024-11-02 18:30:00', 2, 12, 3, 1, 'Finalizado', 12),
(508, '2024-11-02 21:00:00', 1, 16, 0, 2, 'Finalizado', 12),
(509, '2024-11-03 14:00:00', 3, 14, 1, 1, 'Finalizado', 12),
(510, '2024-11-03 16:15:00', 11, 8, 1, 0, 'Finalizado', 12),
(511, '2024-11-03 18:30:00', 20, 10, 1, 1, 'Finalizado', 12),
(512, '2024-11-03 21:00:00', 19, 15, 1, 2, 'Finalizado', 12),
(513, '2024-11-08 18:30:00', 10, 18, 1, 3, 'Finalizado', 13),
(514, '2024-11-08 21:00:00', 15, 5, 4, 0, 'Finalizado', 13),
(515, '2024-11-09 16:00:00', 20, 7, 3, 0, 'Finalizado', 13),
(516, '2024-11-09 18:30:00', 6, 1, 1, 0, 'Finalizado', 13),
(517, '2024-11-09 21:00:00', 14, 11, 2, 2, 'Finalizado', 13),
(518, '2024-11-10 14:00:00', 13, 4, 0, 1, 'Finalizado', 13),
(519, '2024-11-10 16:15:00', 8, 9, 0, 1, 'Finalizado', 13),
(520, '2024-11-10 18:30:00', 17, 3, 1, 1, 'Finalizado', 13),
(521, '2024-11-10 21:00:00', 16, 2, 1, 0, 'Finalizado', 13),
(522, '2024-11-11 18:30:00', 12, 19, 1, 1, 'Finalizado', 13),
(523, '2024-11-22 18:30:00', 8, 17, 2, 0, 'Finalizado', 14),
(524, '2024-11-22 21:00:00', 19, 14, 4, 2, 'Finalizado', 14),
(525, '2024-11-23 16:15:00', 4, 7, 2, 1, 'Finalizado', 14),
(526, '2024-11-23 18:30:00', 18, 13, 2, 3, 'Finalizado', 14),
(527, '2024-11-23 21:00:00', 9, 12, 4, 1, 'Finalizado', 14),
(528, '2024-11-24 14:00:00', 11, 2, 2, 2, 'Finalizado', 14),
(529, '2024-11-24 16:15:00', 5, 20, 2, 2, 'Finalizado', 14),
(530, '2024-11-24 18:30:00', 1, 10, 1, 0, 'Finalizado', 14),
(531, '2024-11-24 21:00:00', 6, 15, 0, 3, 'Finalizado', 14),
(532, '2024-11-25 14:00:00', 3, 16, 1, 0, 'Finalizado', 14),
(533, '2024-11-29 18:30:00', 13, 19, 2, 1, 'Finalizado', 15),
(534, '2024-11-29 21:00:00', 2, 18, 1, 2, 'Finalizado', 15),
(535, '2024-11-30 16:00:00', 7, 6, 1, 1, 'Finalizado', 15),
(536, '2024-11-30 18:30:00', 12, 11, 3, 1, 'Finalizado', 15),
(537, '2024-11-30 21:00:00', 17, 4, 0, 5, 'Finalizado', 15),
(538, '2024-12-01 14:00:00', 20, 9, 2, 2, 'Finalizado', 15),
(539, '2024-12-01 16:15:00', 15, 8, 2, 0, 'Finalizado', 15),
(540, '2024-12-01 18:30:00', 10, 3, 1, 2, 'Finalizado', 15),
(541, '2024-12-01 21:00:00', 16, 14, 2, 0, 'Finalizado', 15),
(542, '2024-12-02 18:30:00', 1, 5, 1, 1, 'Finalizado', 15),
(543, '2024-12-06 18:30:00', 11, 13, 2, 0, 'Finalizado', 16),
(544, '2024-12-06 21:00:00', 18, 17, 2, 1, 'Finalizado', 16),
(545, '2024-12-07 16:15:00', 14, 2, 2, 2, 'Finalizado', 16),
(546, '2024-12-07 18:30:00', 19, 10, 0, 1, 'Finalizado', 16),
(547, '2024-12-07 21:00:00', 9, 15, 0, 3, 'Finalizado', 16),
(548, '2024-12-08 14:00:00', 6, 16, 0, 3, 'Finalizado', 16),
(549, '2024-12-08 16:15:00', 3, 20, 2, 0, 'Finalizado', 16),
(550, '2024-12-08 18:30:00', 5, 7, 2, 2, 'Finalizado', 16),
(551, '2024-12-08 21:00:00', 4, 1, 4, 3, 'Finalizado', 16),
(552, '2024-12-09 18:30:00', 8, 12, 1, 0, 'Finalizado', 16),
(553, '2024-12-13 18:30:00', 17, 19, 1, 0, 'Finalizado', 17),
(554, '2024-12-13 21:00:00', 12, 5, 0, 0, 'Finalizado', 17),
(555, '2024-12-14 16:00:00', 13, 9, 2, 1, 'Finalizado', 17),
(556, '2024-12-14 18:30:00', 1, 11, 1, 0, 'Finalizado', 17),
(557, '2024-12-14 21:00:00', 10, 15, 3, 3, 'Finalizado', 17),
(558, '2024-12-15 14:00:00', 4, 8, 1, 0, 'Finalizado', 17),
(559, '2024-12-15 16:15:00', 7, 3, 1, 1, 'Finalizado', 17),
(560, '2024-12-15 18:30:00', 16, 18, 0, 0, 'Finalizado', 17),
(561, '2024-12-15 21:00:00', 20, 14, 1, 2, 'Finalizado', 17),
(562, '2024-12-15 21:00:00', 2, 6, 0, 1, 'Finalizado', 17),
(563, '2024-12-20 18:30:00', 9, 17, 3, 0, 'Finalizado', 18),
(564, '2024-12-20 21:00:00', 8, 13, 0, 1, 'Finalizado', 18),
(565, '2024-12-21 16:15:00', 11, 16, 2, 0, 'Finalizado', 18),
(566, '2024-12-21 18:30:00', 5, 3, 1, 2, 'Finalizado', 18),
(567, '2024-12-21 21:00:00', 2, 4, 1, 2, 'Finalizado', 18),
(568, '2024-12-22 14:00:00', 19, 7, 2, 2, 'Finalizado', 18),
(569, '2024-12-22 16:15:00', 15, 1, 4, 2, 'Finalizado', 18),
(570, '2024-12-22 18:30:00', 18, 12, 1, 0, 'Finalizado', 18),
(571, '2024-12-22 21:00:00', 6, 20, 2, 5, 'Finalizado', 18),
(572, '2024-12-22 21:00:00', 14, 10, 1, 1, 'Finalizado', 18),
(573, '2024-12-26 18:30:00', 13, 2, 1, 5, 'Finalizado', 19),
(574, '2024-12-26 21:00:00', 3, 15, 2, 1, 'Finalizado', 19),
(575, '2024-12-27 16:15:00', 10, 11, 2, 1, 'Finalizado', 19),
(576, '2024-12-27 18:30:00', 7, 9, 0, 1, 'Finalizado', 19),
(577, '2024-12-27 21:00:00', 17, 14, 1, 0, 'Finalizado', 19),
(578, '2024-12-28 14:00:00', 12, 6, 1, 1, 'Finalizado', 19),
(579, '2024-12-28 16:15:00', 1, 19, 1, 1, 'Finalizado', 19),
(580, '2024-12-28 18:30:00', 18, 8, 1, 2, 'Finalizado', 19),
(581, '2024-12-28 21:00:00', 4, 5, 1, 0, 'Finalizado', 19),
(582, '2024-12-28 21:00:00', 16, 20, 1, 0, 'Finalizado', 19),
(583, '2025-01-17 18:30:00', 12, 17, 2, 1, 'Finalizado', 20),
(584, '2025-01-17 21:00:00', 9, 1, 1, 2, 'Finalizado', 20),
(585, '2025-01-18 16:15:00', 6, 4, 1, 0, 'Finalizado', 20),
(586, '2025-01-18 18:30:00', 14, 7, 1, 3, 'Finalizado', 20),
(587, '2025-01-18 21:00:00', 8, 2, 1, 1, 'Finalizado', 20),
(588, '2025-01-19 14:00:00', 11, 3, 1, 2, 'Finalizado', 20),
(589, '2025-01-19 16:15:00', 15, 18, 4, 1, 'Finalizado', 20),
(590, '2025-01-19 18:30:00', 5, 10, 1, 1, 'Finalizado', 20),
(591, '2025-01-19 21:00:00', 19, 16, 1, 0, 'Finalizado', 20),
(592, '2025-01-20 21:00:00', 20, 13, 4, 0, 'Finalizado', 20),
(593, '2025-01-24 18:30:00', 18, 5, 1, 1, 'Finalizado', 21),
(594, '2025-01-24 21:00:00', 13, 14, 0, 1, 'Finalizado', 21),
(595, '2025-01-25 16:15:00', 4, 20, 1, 1, 'Finalizado', 21),
(596, '2025-01-25 18:30:00', 1, 12, 1, 1, 'Finalizado', 21),
(597, '2025-01-25 21:00:00', 17, 15, 0, 3, 'Finalizado', 21),
(598, '2025-01-26 14:00:00', 10, 9, 2, 1, 'Finalizado', 21),
(599, '2025-01-26 16:15:00', 16, 8, 0, 3, 'Finalizado', 21),
(600, '2025-01-26 18:30:00', 3, 6, 0, 0, 'Finalizado', 21),
(601, '2025-01-26 21:00:00', 2, 19, 7, 1, 'Finalizado', 21),
(602, '2025-01-27 21:00:00', 7, 11, 1, 1, 'Finalizado', 21),
(603, '2025-01-31 16:15:00', 6, 10, 0, 1, 'Finalizado', 22),
(604, '2025-01-31 18:30:00', 8, 1, 0, 0, 'Finalizado', 22),
(605, '2025-02-01 21:00:00', 20, 17, 5, 1, 'Finalizado', 22),
(606, '2025-02-02 14:00:00', 4, 13, 2, 0, 'Finalizado', 22),
(607, '2025-02-02 16:15:00', 12, 15, 1, 0, 'Finalizado', 22),
(608, '2025-02-02 18:30:00', 2, 7, 1, 0, 'Finalizado', 22),
(609, '2025-02-02 21:00:00', 19, 11, 2, 1, 'Finalizado', 22),
(610, '2025-02-03 14:00:00', 5, 16, 2, 1, 'Finalizado', 22),
(611, '2025-02-03 16:15:00', 14, 3, 2, 2, 'Finalizado', 22),
(612, '2025-02-03 18:30:00', 9, 18, 2, 1, 'Finalizado', 22),
(613, '2025-02-07 16:15:00', 10, 17, 1, 0, 'Finalizado', 23),
(614, '2025-02-07 18:30:00', 11, 14, 3, 2, 'Finalizado', 23),
(615, '2025-02-08 21:00:00', 3, 9, 3, 0, 'Finalizado', 23),
(616, '2025-02-09 14:00:00', 18, 20, 1, 2, 'Finalizado', 23),
(617, '2025-02-09 16:15:00', 15, 4, 1, 1, 'Finalizado', 23),
(618, '2025-02-09 18:30:00', 7, 8, 0, 1, 'Finalizado', 23),
(619, '2025-02-09 21:00:00', 19, 6, 2, 0, 'Finalizado', 23),
(620, '2025-02-10 14:00:00', 16, 12, 2, 1, 'Finalizado', 23),
(621, '2025-02-10 16:15:00', 1, 2, 1, 4, 'Finalizado', 23),
(622, '2025-02-10 18:30:00', 13, 5, 1, 1, 'Finalizado', 23),
(623, '2025-02-14 00:00:00', 9, 8, 1, 2, 'Finalizado', 24),
(624, '2025-02-14 00:00:00', 6, 7, 3, 3, 'Finalizado', 24),
(625, '2025-02-15 00:00:00', 5, 15, 1, 1, 'Finalizado', 24),
(626, '2025-02-15 00:00:00', 4, 11, 1, 1, 'Finalizado', 24),
(627, '2025-02-15 00:00:00', 20, 19, 1, 1, 'Finalizado', 24),
(628, '2025-02-15 00:00:00', 12, 3, 1, 1, 'Finalizado', 24),
(629, '2025-02-16 00:00:00', 17, 1, 0, 4, 'Finalizado', 24),
(630, '2025-02-16 00:00:00', 13, 18, 3, 1, 'Finalizado', 24),
(631, '2025-02-17 00:00:00', 14, 16, 3, 0, 'Finalizado', 24),
(632, '2025-02-17 00:00:00', 2, 10, 1, 0, 'Finalizado', 24),
(633, '2025-02-21 00:00:00', 11, 5, 1, 0, 'Finalizado', 25),
(634, '2025-02-21 00:00:00', 7, 12, 0, 1, 'Finalizado', 25),
(635, '2025-02-22 00:00:00', 10, 20, 0, 1, 'Finalizado', 25),
(636, '2025-02-22 00:00:00', 19, 4, 0, 3, 'Finalizado', 25),
(637, '2025-02-22 00:00:00', 18, 2, 0, 2, 'Finalizado', 25),
(638, '2025-02-22 00:00:00', 3, 17, 7, 1, 'Finalizado', 25),
(639, '2025-02-23 00:00:00', 15, 9, 2, 0, 'Finalizado', 25),
(640, '2025-02-23 00:00:00', 8, 14, 1, 2, 'Finalizado', 25),
(641, '2025-02-23 00:00:00', 16, 6, 3, 0, 'Finalizado', 25),
(642, '2025-02-24 00:00:00', 1, 13, 1, 1, 'Finalizado', 25),
(643, '2025-02-28 00:00:00', 17, 18, 1, 1, 'Finalizado', 26),
(644, '2025-02-28 00:00:00', 9, 11, 2, 2, 'Finalizado', 26),
(645, '2025-02-28 00:00:00', 10, 1, 1, 1, 'Finalizado', 26),
(646, '2025-02-28 00:00:00', 14, 15, 2, 1, 'Finalizado', 26),
(647, '2025-02-28 00:00:00', 4, 3, 1, 0, 'Finalizado', 26),
(648, '2025-02-28 00:00:00', 6, 8, 1, 0, 'Finalizado', 26),
(649, '2025-02-28 00:00:00', 2, 16, 4, 0, 'Finalizado', 26),
(650, '2025-02-28 00:00:00', 13, 7, 1, 1, 'Finalizado', 26),
(651, '2025-02-28 00:00:00', 5, 19, 3, 3, 'Finalizado', 26),
(652, '2025-02-28 00:00:00', 20, 12, 1, 0, 'Finalizado', 26),
(653, '2025-03-08 00:00:00', 11, 6, 2, 1, 'Finalizado', 27),
(654, '2025-03-08 00:00:00', 7, 20, 1, 0, 'Finalizado', 27),
(655, '2025-03-08 00:00:00', 19, 17, 2, 1, 'Finalizado', 27),
(656, '2025-03-08 00:00:00', 8, 4, 2, 1, 'Finalizado', 27),
(657, '2025-03-08 00:00:00', 15, 10, 2, 1, 'Finalizado', 27),
(658, '2025-03-08 00:00:00', 3, 13, 1, 1, 'Finalizado', 27),
(659, '2025-03-08 00:00:00', 14, 18, 1, 0, 'Finalizado', 27),
(660, '2025-03-08 00:00:00', 16, 1, 0, 1, 'Finalizado', 27),
(661, '2025-03-08 00:00:00', 12, 9, 1, 1, 'Finalizado', 27),
(662, '2025-03-08 00:00:00', 2, 5, 3, 0, 'Finalizado', 27),
(663, '2025-03-14 00:00:00', 18, 7, 2, 2, 'Finalizado', 28),
(664, '2025-03-14 00:00:00', 17, 11, 0, 1, 'Finalizado', 28),
(665, '2025-03-14 00:00:00', 13, 12, 2, 1, 'Finalizado', 28),
(666, '2025-03-14 00:00:00', 20, 15, 1, 2, 'Finalizado', 28),
(667, '2025-03-14 00:00:00', 9, 19, 1, 1, 'Finalizado', 28),
(668, '2025-03-14 00:00:00', 6, 14, 2, 3, 'Finalizado', 28),
(669, '2025-03-14 00:00:00', 1, 3, 0, 1, 'Finalizado', 28),
(670, '2025-03-14 00:00:00', 10, 16, 2, 2, 'Finalizado', 28),
(671, '2025-03-14 00:00:00', 5, 8, 1, 2, 'Finalizado', 28),
(672, '2025-03-14 00:00:00', 4, 2, 2, 4, 'Finalizado', 28),
(673, '2025-03-29 00:00:00', 16, 17, 2, 1, 'Finalizado', 29),
(674, '2025-03-29 00:00:00', 12, 4, 1, 1, 'Finalizado', 29),
(675, '2025-03-29 00:00:00', 7, 10, 0, 2, 'Finalizado', 29),
(676, '2025-03-29 00:00:00', 15, 6, 3, 2, 'Finalizado', 29),
(677, '2025-03-29 00:00:00', 8, 20, 1, 2, 'Finalizado', 29),
(678, '2025-03-29 00:00:00', 2, 9, 4, 1, 'Finalizado', 29),
(679, '2025-03-29 00:00:00', 19, 13, 1, 0, 'Finalizado', 29),
(680, '2025-03-29 00:00:00', 3, 5, 0, 0, 'Finalizado', 29),
(681, '2025-03-29 00:00:00', 14, 1, 2, 1, 'Finalizado', 29),
(682, '2025-03-29 00:00:00', 11, 18, 1, 1, 'Finalizado', 29),
(683, '2025-04-04 00:00:00', 10, 12, 0, 4, 'Finalizado', 30),
(684, '2025-04-04 00:00:00', 9, 7, 0, 1, 'Finalizado', 30),
(685, '2025-04-05 00:00:00', 15, 19, 1, 2, 'Finalizado', 30),
(686, '2025-04-05 00:00:00', 13, 11, 1, 2, 'Finalizado', 30),
(687, '2025-04-05 00:00:00', 2, 14, 1, 1, 'Finalizado', 30),
(688, '2025-04-06 00:00:00', 18, 16, 1, 3, 'Finalizado', 30),
(689, '2025-04-06 00:00:00', 1, 4, 1, 2, 'Finalizado', 30),
(690, '2025-04-06 00:00:00', 17, 8, 0, 4, 'Finalizado', 30),
(691, '2025-04-07 00:00:00', 20, 3, 0, 0, 'Finalizado', 30),
(692, '2025-04-07 00:00:00', 6, 5, 1, 1, 'Finalizado', 30),
(693, '2025-04-11 00:00:00', 19, 1, 1, 0, 'Finalizado', 31),
(694, '2025-04-11 00:00:00', 16, 13, 0, 2, 'Finalizado', 31),
(695, '2025-04-12 00:00:00', 8, 18, 1, 3, 'Finalizado', 31),
(696, '2025-04-12 00:00:00', 11, 12, 0, 2, 'Finalizado', 31),
(697, '2025-04-12 00:00:00', 6, 2, 0, 1, 'Finalizado', 31),
(698, '2025-04-13 00:00:00', 5, 9, 2, 1, 'Finalizado', 31),
(699, '2025-04-13 00:00:00', 7, 15, 0, 1, 'Finalizado', 31),
(700, '2025-04-14 00:00:00', 14, 20, 1, 2, 'Finalizado', 31),
(701, '2025-04-14 00:00:00', 3, 10, 3, 1, 'Finalizado', 31),
(702, '2025-04-14 00:00:00', 4, 17, 4, 2, 'Finalizado', 31),
(703, '2025-04-18 00:00:00', 12, 8, 1, 0, 'Finalizado', 32),
(704, '2025-04-19 00:00:00', 10, 19, 1, 1, 'Finalizado', 32),
(705, '2025-04-19 00:00:00', 2, 11, 4, 3, 'Finalizado', 32),
(706, '2025-04-20 00:00:00', 13, 6, 0, 0, 'Finalizado', 32),
(707, '2025-04-20 00:00:00', 18, 4, 1, 0, 'Finalizado', 32),
(708, '2025-04-20 00:00:00', 17, 5, 2, 3, 'Finalizado', 32),
(709, '2025-04-21 00:00:00', 20, 16, 2, 2, 'Finalizado', 32),
(710, '2025-04-21 00:00:00', 1, 7, 1, 1, 'Finalizado', 32),
(711, '2025-04-21 00:00:00', 15, 3, 1, 0, 'Finalizado', 32),
(712, '2025-04-21 00:00:00', 9, 14, 1, 3, 'Finalizado', 32),
(713, '2025-04-22 00:00:00', 19, 12, 1, 1, 'Finalizado', 33),
(714, '2025-04-22 00:00:00', 2, 13, 1, 0, 'Finalizado', 33),
(715, '2025-04-22 00:00:00', 3, 18, 1, 0, 'Finalizado', 33),
(716, '2025-04-23 00:00:00', 11, 20, 3, 0, 'Finalizado', 33),
(717, '2025-04-23 00:00:00', 8, 15, 0, 1, 'Finalizado', 33),
(718, '2025-04-23 00:00:00', 7, 16, 1, 0, 'Finalizado', 33),
(719, '2025-04-24 00:00:00', 5, 1, 1, 0, 'Finalizado', 33),
(720, '2025-04-24 00:00:00', 6, 9, 1, 1, 'Finalizado', 33),
(721, '2025-04-24 00:00:00', 14, 17, 5, 1, 'Finalizado', 33),
(722, '2025-04-24 00:00:00', 4, 10, 3, 0, 'Finalizado', 33),
(723, '2025-05-02 00:00:00', 10, 8, 1, 0, 'Finalizado', 34),
(724, '2025-05-02 00:00:00', 7, 4, 0, 0, 'Finalizado', 34),
(725, '2025-05-03 00:00:00', 20, 5, 4, 2, 'Finalizado', 34),
(726, '2025-05-03 00:00:00', 18, 19, 2, 3, 'Finalizado', 34),
(727, '2025-05-04 00:00:00', 17, 2, 1, 2, 'Finalizado', 34),
(728, '2025-05-04 00:00:00', 15, 11, 3, 2, 'Finalizado', 34),
(729, '2025-05-05 00:00:00', 1, 6, 2, 2, 'Finalizado', 34),
(730, '2025-05-05 00:00:00', 12, 14, 1, 2, 'Finalizado', 34),
(731, '2025-05-05 00:00:00', 16, 3, 0, 0, 'Finalizado', 34),
(732, '2025-05-05 00:00:00', 9, 13, 1, 0, 'Finalizado', 34),
(733, '2025-05-09 00:00:00', 18, 10, 0, 1, 'Finalizado', 35),
(734, '2025-05-09 00:00:00', 19, 8, 3, 0, 'Finalizado', 35),
(735, '2025-05-09 00:00:00', 11, 1, 3, 2, 'Finalizado', 35),
(736, '2025-05-09 00:00:00', 9, 20, 0, 1, 'Finalizado', 35),
(737, '2025-05-10 00:00:00', 13, 17, 2, 1, 'Finalizado', 35),
(738, '2025-05-10 00:00:00', 4, 16, 4, 0, 'Finalizado', 35),
(739, '2025-05-10 00:00:00', 6, 12, 3, 2, 'Finalizado', 35),
(740, '2025-05-11 00:00:00', 2, 15, 4, 3, 'Finalizado', 35),
(741, '2025-05-11 00:00:00', 3, 7, 1, 0, 'Finalizado', 35),
(742, '2025-05-11 00:00:00', 14, 5, 1, 1, 'Finalizado', 35),
(743, '2025-05-13 00:00:00', 17, 9, 0, 1, 'Finalizado', 36),
(744, '2025-05-13 00:00:00', 16, 11, 0, 1, 'Finalizado', 36),
(745, '2025-05-13 00:00:00', 1, 18, 1, 0, 'Finalizado', 36),
(746, '2025-05-14 00:00:00', 20, 6, 3, 0, 'Finalizado', 36),
(747, '2025-05-14 00:00:00', 7, 19, 1, 0, 'Finalizado', 36),
(748, '2025-05-14 00:00:00', 15, 13, 2, 1, 'Finalizado', 36),
(749, '2025-05-15 00:00:00', 5, 4, 2, 0, 'Finalizado', 36),
(750, '2025-05-15 00:00:00', 10, 14, 2, 2, 'Finalizado', 36),
(751, '2025-05-15 00:00:00', 12, 2, 0, 2, 'Finalizado', 36),
(752, '2025-05-15 00:00:00', 8, 3, 0, 2, 'Finalizado', 36),
(753, '2025-05-18 00:00:00', 1, 15, 0, 2, 'Finalizado', 37),
(754, '2025-05-18 00:00:00', 4, 14, 4, 1, 'Finalizado', 37),
(755, '2025-05-18 00:00:00', 13, 8, 1, 2, 'Finalizado', 37),
(756, '2025-05-18 00:00:00', 5, 12, 2, 0, 'Finalizado', 37),
(757, '2025-05-18 00:00:00', 19, 3, 0, 1, 'Finalizado', 37),
(758, '2025-05-18 00:00:00', 11, 10, 1, 2, 'Finalizado', 37),
(759, '2025-05-18 00:00:00', 17, 7, 0, 1, 'Finalizado', 37),
(760, '2025-05-18 00:00:00', 16, 9, 3, 2, 'Finalizado', 37),
(761, '2025-05-18 00:00:00', 2, 20, 2, 3, 'Finalizado', 37),
(762, '2025-05-18 00:00:00', 18, 6, 0, 1, 'Finalizado', 37),
(763, '2025-05-23 00:00:00', 14, 19, 1, 1, 'Finalizado', 38),
(764, '2025-05-23 00:00:00', 15, 16, 2, 0, 'Finalizado', 38),
(765, '2025-05-23 00:00:00', 6, 17, 3, 0, 'Finalizado', 38),
(766, '2025-05-23 00:00:00', 12, 18, 2, 0, 'Finalizado', 38),
(767, '2025-05-23 00:00:00', 10, 13, 0, 0, 'Finalizado', 38),
(768, '2025-05-23 00:00:00', 8, 11, 1, 2, 'Finalizado', 38),
(769, '2025-05-23 00:00:00', 7, 5, 1, 1, 'Finalizado', 38),
(770, '2025-05-23 00:00:00', 9, 4, 0, 4, 'Finalizado', 38),
(771, '2025-05-23 00:00:00', 20, 1, 4, 2, 'Finalizado', 38),
(772, '2025-05-23 00:00:00', 3, 2, 0, 3, 'Finalizado', 38);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `rol` varchar(15) NOT NULL DEFAULT 'user',
  `imagen_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `contrasena`, `rol`, `imagen_perfil`) VALUES
(2, 'Admin', 'admin@admin.com', '$2b$10$JrmBQA/V0Bupa4MDyhoX3uTewmZworZp/lA3ns/PS.4nIN.OKIWpW', 'user', 'https://i.imgur.com/czS5ew8.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`idequipo`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`idjugador`),
  ADD KEY `idequipo` (`idequipo`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`idpartido`),
  ADD KEY `idequipolocal` (`idequipolocal`),
  ADD KEY `idequipovisitante` (`idequipovisitante`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `idequipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `idjugador` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `idpartido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=773;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_1` FOREIGN KEY (`idequipo`) REFERENCES `equipos` (`idequipo`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `partidos_ibfk_1` FOREIGN KEY (`idequipolocal`) REFERENCES `equipos` (`idequipo`),
  ADD CONSTRAINT `partidos_ibfk_2` FOREIGN KEY (`idequipovisitante`) REFERENCES `equipos` (`idequipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
