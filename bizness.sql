-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 23-Maio-2017 às 18:29
-- Versão do servidor: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bizness`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `destaques`
--

CREATE TABLE `destaques` (
  `id` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '0',
  `foto` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `destaques`
--

INSERT INTO `destaques` (`id`, `ativo`, `foto`) VALUES
(1, 1, '1-2017-05-23-033947newyorkcity3-wallpaper-1920x1080jpg.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `destaques_idiomas`
--

CREATE TABLE `destaques_idiomas` (
  `id_destaque` int(11) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `nome` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `destaques_idiomas`
--

INSERT INTO `destaques_idiomas` (`id_destaque`, `sigla`, `tipo`, `nome`) VALUES
(1, 'en', 'asdasd', 'asdasdsdf'),
(1, 'pt', 'ativaÃ§Ã£o', 'Coisas Fofas');

-- --------------------------------------------------------

--
-- Estrutura da tabela `idiomas`
--

CREATE TABLE `idiomas` (
  `sigla` varchar(2) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `principal` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `idiomas`
--

INSERT INTO `idiomas` (`sigla`, `activo`, `nome`, `principal`) VALUES
('en', 1, 'ingles', 0),
('pt', 1, 'Portugues', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projetos`
--

CREATE TABLE `projetos` (
  `id` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '0',
  `logo` varchar(200) NOT NULL,
  `cor` varchar(6) NOT NULL,
  `destaque` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `projetos`
--

INSERT INTO `projetos` (`id`, `ativo`, `logo`, `cor`, `destaque`) VALUES
(1, 0, '1-2017-05-23-033851europeanarchitecture-wallpaper-1920x1080jpg.jpg', 'ffffff', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projetos_fotos`
--

CREATE TABLE `projetos_fotos` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `foto` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `projetos_fotos`
--

INSERT INTO `projetos_fotos` (`id`, `id_projeto`, `foto`) VALUES
(1, 1, '8-2017-05-23-025553marinabaysingapore2-wallpaper-1920x1080jpg.jpg'),
(2, 1, '3-2017-05-23-025601europeanarchitecture-wallpaper-1920x1080jpg.jpg'),
(3, 1, '1-2017-05-23-033901newyork4-wallpaper-1920x1080jpg.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `projetos_fotos_idiomas`
--

CREATE TABLE `projetos_fotos_idiomas` (
  `id_projeto_foto` int(11) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `titulo` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `projetos_fotos_idiomas`
--

INSERT INTO `projetos_fotos_idiomas` (`id_projeto_foto`, `sigla`, `titulo`) VALUES
(3, 'en', '2'),
(3, 'pt', 'titulo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `projetos_idiomas`
--

CREATE TABLE `projetos_idiomas` (
  `id_projeto` int(11) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `subtitulo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `projetos_idiomas`
--

INSERT INTO `projetos_idiomas` (`id_projeto`, `sigla`, `nome`, `subtitulo`) VALUES
(1, 'en', 'zxc', 'zxc'),
(1, 'pt', 'zxcd', 'zxc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destaques`
--
ALTER TABLE `destaques`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destaques_idiomas`
--
ALTER TABLE `destaques_idiomas`
  ADD PRIMARY KEY (`id_destaque`,`sigla`),
  ADD KEY `sigla` (`sigla`);

--
-- Indexes for table `idiomas`
--
ALTER TABLE `idiomas`
  ADD PRIMARY KEY (`sigla`),
  ADD KEY `sigla` (`sigla`);

--
-- Indexes for table `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projetos_fotos`
--
ALTER TABLE `projetos_fotos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projetos_fotos_idiomas`
--
ALTER TABLE `projetos_fotos_idiomas`
  ADD PRIMARY KEY (`id_projeto_foto`,`sigla`),
  ADD KEY `sigla` (`sigla`);

--
-- Indexes for table `projetos_idiomas`
--
ALTER TABLE `projetos_idiomas`
  ADD PRIMARY KEY (`id_projeto`,`sigla`),
  ADD KEY `sigla` (`sigla`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destaques`
--
ALTER TABLE `destaques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `projetos`
--
ALTER TABLE `projetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `projetos_fotos`
--
ALTER TABLE `projetos_fotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `destaques_idiomas`
--
ALTER TABLE `destaques_idiomas`
  ADD CONSTRAINT `destaques_idiomas_ibfk_2` FOREIGN KEY (`sigla`) REFERENCES `idiomas` (`sigla`),
  ADD CONSTRAINT `destaques_idiomas_ibfk_1` FOREIGN KEY (`id_destaque`) REFERENCES `destaques` (`id`);

--
-- Limitadores para a tabela `projetos_fotos_idiomas`
--
ALTER TABLE `projetos_fotos_idiomas`
  ADD CONSTRAINT `projetos_fotos_idiomas_ibfk_2` FOREIGN KEY (`sigla`) REFERENCES `idiomas` (`sigla`),
  ADD CONSTRAINT `projetos_fotos_idiomas_ibfk_1` FOREIGN KEY (`id_projeto_foto`) REFERENCES `projetos_fotos` (`id`);

--
-- Limitadores para a tabela `projetos_idiomas`
--
ALTER TABLE `projetos_idiomas`
  ADD CONSTRAINT `projetos_idiomas_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`),
  ADD CONSTRAINT `projetos_idiomas_ibfk_2` FOREIGN KEY (`sigla`) REFERENCES `idiomas` (`sigla`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
