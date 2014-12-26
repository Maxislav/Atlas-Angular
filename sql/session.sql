-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 18 2014 г., 12:56
-- Версия сервера: 5.5.35-1ubuntu1
-- Версия PHP: 5.5.9-1ubuntu4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `monitoring`
--

-- --------------------------------------------------------

--
-- Структура таблицы `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `key` text CHARACTER SET utf8 NOT NULL,
  `iduser` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

--
-- Дамп данных таблицы `session`
--

INSERT INTO `session` (`id`, `key`, `iduser`, `date`) VALUES
(7, '3f0c067fa4cac3618676ca163af548c4', 28, '2014-11-12 11:19:34'),
(8, 'a64273fcc1892bad75fb48cc8834f2b1', 28, '2014-11-12 11:19:51'),
(9, '50afc1343850a79bc7888d3e2fd4ccdd', 28, '2014-11-12 11:23:02'),
(10, 'aaa80e84ff3e484a3983d1678cec094f', 28, '2014-11-12 11:24:37'),
(11, 'fd5eb0b16b3e97c0810f2837b64a93c7', 28, '2014-11-12 11:27:39'),
(12, '12d31295fda9927984a6ad03a364352f', 28, '2014-11-12 11:28:19'),
(13, '9e3b602640921566b50eced948efe4ea', 28, '2014-11-12 11:29:51'),
(14, '816da73c8c71403fe5a47a9e6a0d1fbc', 28, '2014-11-12 11:30:59'),
(15, '2f8eb95c07eed7eeb075a88f23fa4ad9', 28, '0000-00-00 00:00:00'),
(20, '0a69abb296bd29c16e3c01dd85833d20', 28, '2014-11-12 15:34:13'),
(37, 'f077f075912c0cfece8ebc04d00dc3fb', 28, '2014-11-14 10:33:32'),
(39, '15afbdffe28ab61640b4e837d80567d2', 28, '2014-11-14 11:40:31'),
(41, '9b4a1e9125ddf4348950767282deb02c', 28, '2014-11-17 13:46:38'),
(50, 'fb682be6c22821271fa907fa719515fe', 28, '2014-11-25 13:55:48'),
(51, '5e27fa9f1e017d329261a023f2400ce1', 28, '2014-11-26 15:41:14'),
(52, 'f2a5397b62e2db0d28388cb8df3f14e9', 28, '2014-11-27 15:55:25'),
(53, '35c0f17bf81e581290efc4a10449174f', 28, '2014-12-15 15:32:43');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
