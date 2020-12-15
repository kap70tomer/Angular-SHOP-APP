-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `cart_id` bigint NOT NULL,
  `total_price` int NOT NULL,
  `city_delivery` varchar(45) NOT NULL,
  `street_delivery` varchar(45) NOT NULL,
  `date_delivery` date NOT NULL,
  `date_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `credit` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `credit_UNIQUE` (`credit`),
  KEY `orders_user_id_idx` (`user_id`),
  KEY `orders_cart_id_idx` (`cart_id`),
  CONSTRAINT `orders_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`),
  CONSTRAINT `orders_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,1,71,49,'TEL-AVIV','mizpe 122','2020-04-23','2020-04-19 15:19:20',1231),(6,1,70,90,'TEL-AVIV','mizpe 2222','2020-10-21','2020-04-19 15:52:34',1233),(10,1,72,286,'PETAH-TIKVA','saddx','2020-05-01','2020-04-19 17:16:20',1312),(12,1,72,286,'TEL-AVIV','DFADSADSD','2020-04-17','2020-04-19 17:21:36',2133),(13,1,72,286,'RISHON-LEZION','Dqcwasdfa','2020-04-24','2020-04-19 17:51:22',1323),(14,1,72,286,'RISHON-LEZION','dasaadsadasdsadas','2020-04-17','2020-04-19 18:09:41',1321),(15,1,72,286,'PETAH-TIKVA','eqdqqw','2020-04-24','2020-04-19 18:21:03',3121),(17,1,72,286,'RISHON-LEZION','dads','2020-04-29','2020-04-19 19:06:11',1232),(20,1,72,286,'RISHON-LEZION','dasds','2020-04-23','2020-04-19 19:28:52',1332),(26,1,77,433,'TEL-AVIV','Mizpe 34','2020-04-23','2020-04-20 18:57:26',1313),(27,3,88,43,'TEL-AVIV','mizpe 12','2020-04-17','2020-04-21 11:53:30',5312121212321321);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-22  1:50:27
