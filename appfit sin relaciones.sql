-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2023 a las 07:53:09
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appfit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellido`, `cedula`, `telefono`, `fecha_nacimiento`, `direccion`) VALUES
(1, 'Josue Armando', 'Velasquez Delgado', '2350793218', '0980167849', '2000-09-27', 'Coop: Asistencia municipal Barrio la floresta.'),
(19, 'Daniela Breachy', 'Gonzalez Moran', '2350793218', '0987456315', '1998-01-21', 'Su casa'),
(33, 'Juan Mecanico', 'Garcia Mendez', '2350793218', '0980167849', '2023-06-27', 'Coop: Asistencia municipal Barrio la floresta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `id_suplemento` int(11) NOT NULL,
  `monto_cotizacion` double NOT NULL,
  `estado_cotizacion` varchar(15) NOT NULL,
  `observacion_cotizacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizacion`
--

INSERT INTO `cotizacion` (`id`, `id_cliente`, `id_rutina`, `id_servicio`, `id_suplemento`, `monto_cotizacion`, `estado_cotizacion`, `observacion_cotizacion`) VALUES
(1, 0, 3, 2, 2, 21, 'Pendiente', '-'),
(2, 0, 3, 0, 2, 23, 'Pendiente', '-'),
(3, 0, 3, 0, 0, 23, 'Pagado', '-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE `rutina` (
  `id` int(11) NOT NULL,
  `nombre_rutina` varchar(50) NOT NULL,
  `duracion_rutina` varchar(30) NOT NULL,
  `descripcion_rutina` varchar(255) NOT NULL,
  `dias_rutina` text NOT NULL,
  `material_rutina` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`id`, `nombre_rutina`, `duracion_rutina`, `descripcion_rutina`, `dias_rutina`, `material_rutina`) VALUES
(2, 'Rutina de fuerza', '60 minutos', 'Rutina enfocada en el desarrollo de la fuerza muscular. Incluye ejercicios de levantamiento de pesas y máquinas.', 'Lunes, Miércoles, Viernes', 'Pesas, Banco, Barra, Mancuernas'),
(3, 'Rutina de cardio', '45 minutos', 'Rutina de alta intensidad para quemar calorías y mejorar la resistencia cardiovascular. Incluye ejercicios de saltos, carrera y bicicleta estática.', 'Martes, Jueves, Sábado', 'Bicicleta, Cuerda'),
(4, 'Rutina de flexibilidad', '30 minutos', 'Rutina centrada en mejorar la flexibilidad y la movilidad articular. Incluye ejercicios de estiramientos estáticos y dinámicos.', 'Miércoles, Viernes, Domingo', 'Colchoneta, Banda elástica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id` int(11) NOT NULL,
  `nombre_servicio` varchar(30) NOT NULL,
  `descripcion_servicio` varchar(255) NOT NULL,
  `precio_servicio` double NOT NULL,
  `duracion_servicio` varchar(50) NOT NULL,
  `promocion_servicio` varchar(50) NOT NULL,
  `observaciones_servicio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id`, `nombre_servicio`, `descripcion_servicio`, `precio_servicio`, `duracion_servicio`, `promocion_servicio`, `observaciones_servicio`) VALUES
(1, 'Registrado', 'Ya tiene acceso a algún otro servicio', 0, '-', '-', 'Servicio por defecto'),
(2, 'Acceso al gimnasio', 'Acceso completo a todas las instalaciones', 60, '1 mes', 'Promoción: 2x1', 'Incluye acceso a clases grupales'),
(3, 'Entrenamiento personal', 'Entrenamiento individualizado con un coach', 50, '1 hora', '-', 'Disponibilidad solo en horarios de la tarde'),
(4, 'Clases de yoga', 'Sesiones de yoga para todos los niveles', 10, '60 minutos', 'Descuento del 10%', 'Requiere reserva previa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suplemento`
--

CREATE TABLE `suplemento` (
  `id` int(11) NOT NULL,
  `nombre_suplemento` varchar(30) NOT NULL,
  `descripcion_suplemento` varchar(255) NOT NULL,
  `marca_suplemento` varchar(30) NOT NULL,
  `categoria_suplemento` varchar(15) NOT NULL,
  `presentacion_suplemento` varchar(15) NOT NULL,
  `instrucciones_suplemento` varchar(255) NOT NULL,
  `precio_suplemento` double NOT NULL,
  `disponibilidad_suplemento` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suplemento`
--

INSERT INTO `suplemento` (`id`, `nombre_suplemento`, `descripcion_suplemento`, `marca_suplemento`, `categoria_suplemento`, `presentacion_suplemento`, `instrucciones_suplemento`, `precio_suplemento`, `disponibilidad_suplemento`) VALUES
(1, 'Sin suplemento', '-', '-', '-', '-', '-', 0, 'Disponible'),
(2, 'Proteína en polvo', 'Suplemento de proteínas para la recuperación', 'Optimum', 'Proteínas', 'Polvo', 'Tomar 1 porción después del entrenamiento', 29.99, 'Disponible'),
(3, 'Creatina monohidrato', 'Suplemento para mejorar el rendimiento y fuerza', 'Universal', 'Pre-entreno', 'Polvo', 'Tomar 5g antes del entrenamiento', 19.99, 'Agotado'),
(4, 'Omega 3', 'Suplemento de ácidos grasos esenciales', 'Nordic', 'Vitaminas', 'Cápsulas', 'Tomar 1 cápsula al día', 15.99, 'Disponible'),
(5, 'Multivitamínico', 'Suplemento con vitaminas y minerales esenciales', 'Centrum', 'Vitaminas', 'Tabletas', 'Tomar 1 tableta al día', 12.99, 'Disponible');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suplemento`
--
ALTER TABLE `suplemento`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rutina`
--
ALTER TABLE `rutina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `suplemento`
--
ALTER TABLE `suplemento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
