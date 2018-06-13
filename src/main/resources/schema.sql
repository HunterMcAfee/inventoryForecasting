CREATE DATABASE  IF NOT EXISTS forecast_capstone /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE forecast_capstone;

-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: forcast_capstone
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `factors`
--

DROP TABLE IF EXISTS factors;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8;
CREATE TABLE `factors` (
 `f_id` int(11) NOT NULL,
 `f_description` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 PRIMARY KEY (`f_id`),
 UNIQUE KEY `f_id_UNIQUE` (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `factors`
--

LOCK TABLES `factors` WRITE;
/*!40000 ALTER TABLE `factors` DISABLE KEYS */;
/*!40000 ALTER TABLE `factors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salesfactor`
--

DROP TABLE IF EXISTS `salesfactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8;
CREATE TABLE `salesfactor` (
 `sf_id` int(11) NOT NULL AUTO_INCREMENT,
 `sf_sh_id` int(11) NOT NULL,
 `sf_f_id` int(11) NOT NULL,
 `sf_sign` tinyint(4) NOT NULL,
 `sf_percentvalue` int(11) NOT NULL,
 PRIMARY KEY (`sf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `salesfactor`
--

LOCK TABLES `salesfactor` WRITE;
/*!40000 ALTER TABLE `salesfactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesfactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saleshistory`
--

DROP TABLE IF EXISTS `saleshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8;
CREATE TABLE `saleshistory` (
  `sh_id` int(11) NOT NULL AUTO_INCREMENT,
  `sh_str_id` int(11) NOT NULL,
  `sh_week` int(11) NOT NULL,
  `sh_year` int(11) NOT NULL,
  `sh_qty` int(11) NOT NULL,
  `sh_sku_id` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sh_factor_id` int(11) NOT NULL,
  PRIMARY KEY (`sh_id`),
  KEY `factor_idx` (`sh_factor_id`),
  KEY `str_idx` (`sh_str_id`),
  KEY `sku_idx` (`sh_sku_id`),
  CONSTRAINT `factor` FOREIGN KEY (`sh_factor_id`) REFERENCES `factors` (`f_id`),
  CONSTRAINT `str` FOREIGN KEY (`sh_str_id`) REFERENCES `strmaster` (`str_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `saleshistory`
--

LOCK TABLES `saleshistory` WRITE;
/*!40000 ALTER TABLE `saleshistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `saleshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skumaster`
--

DROP TABLE IF EXISTS `skumaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `skumaster` (
 `sku_id` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 `sku_description` varchar(140) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 PRIMARY KEY (`sku_id`),
 UNIQUE KEY `sku_id_UNIQUE` (`sku_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skumaster`
--

LOCK TABLES `skumaster` WRITE;
/*!40000 ALTER TABLE `skumaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `skumaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strmaster`
--

DROP TABLE IF EXISTS `strmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8;
CREATE TABLE `strmaster` (
 `str_id` int(11) NOT NULL,
 `str_type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
 PRIMARY KEY (`str_id`),
 UNIQUE KEY `str_id_UNIQUE` (`str_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `strmaster`
--

LOCK TABLES `strmaster` WRITE;
/*!40000 ALTER TABLE `strmaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `strmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'forcast_capstone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-05 10:25:20