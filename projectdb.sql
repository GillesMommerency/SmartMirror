-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	8.0.15

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
-- Table structure for table `metingen`
--

DROP TABLE IF EXISTS `metingen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `metingen` (
  `metingID` int(11) NOT NULL AUTO_INCREMENT,
  `datumTijd` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sensorID` int(11) NOT NULL,
  `waarde` decimal(4,2) DEFAULT '0.00',
  PRIMARY KEY (`metingID`),
  KEY `fk_Metingen_Sensoren_idx` (`sensorID`),
  CONSTRAINT `fk_Metingen_Sensoren` FOREIGN KEY (`sensorID`) REFERENCES `sensoren` (`sensorID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metingen`
--

LOCK TABLES `metingen` WRITE;
/*!40000 ALTER TABLE `metingen` DISABLE KEYS */;
INSERT INTO `metingen` VALUES (1,'2019-05-27 08:30:00',1,22.58),(2,'2019-05-27 08:30:00',2,63.67),(3,'2019-05-27 23:21:04',1,20.68);
/*!40000 ALTER TABLE `metingen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensoren`
--

DROP TABLE IF EXISTS `sensoren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sensoren` (
  `sensorID` int(11) NOT NULL,
  `beschrijving` varchar(45) NOT NULL,
  PRIMARY KEY (`sensorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensoren`
--

LOCK TABLES `sensoren` WRITE;
/*!40000 ALTER TABLE `sensoren` DISABLE KEYS */;
INSERT INTO `sensoren` VALUES (1,'Temperatuursensor'),(2,'Vichtigheidssensor');
/*!40000 ALTER TABLE `sensoren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'projectdb'
--

--
-- Dumping routines for database 'projectdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-18 18:31:05
