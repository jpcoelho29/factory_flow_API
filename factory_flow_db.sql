-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 06-Fev-2020 às 16:55
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.2

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `factory_flow_db`
--
CREATE DATABASE
IF NOT EXISTS `factory_flow_db` DEFAULT CHARACTER
SET utf8mb4
COLLATE utf8mb4_general_ci;
USE `factory_flow_db`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE
IF NOT EXISTS `tbl_users`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `username` varchar
(255) NOT NULL,
  `password` varchar
(255) NOT NULL,
  `email` varchar
(255) NOT NULL,
  `status` tinyint
(1) NOT NULL DEFAULT '1',
  `phone` varchar
(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tbl_users`
--

INSERT INTO `tbl_users` (`
id`,
`username
`, `password`, `email`, `status`, `phone`, `created_at`) VALUES
(1, 'jpcoelho', '', '', 1, NULL, '2020-02-05 14:48:27'),
(34, 'jpmiranda', '$2a$10$Ovkc9RVj55TMgFmS2/wGx.R7mbixaggOxv70mBtCr7TeWWdwZc8jW', '@', 1, NULL, '2020-02-06 15:29:49');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
