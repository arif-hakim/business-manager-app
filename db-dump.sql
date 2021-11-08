/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.8-MariaDB : Database - db_the_puzzlers_test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_the_puzzlers_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

/*Table structure for table `business_categories` */

DROP TABLE IF EXISTS `business_categories`;

CREATE TABLE `business_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `business_categories` */

insert  into `business_categories`(`id`,`name`,`createdAt`,`updatedAt`) values 
(1,'Food & Beverages','2021-11-06 04:39:59','2021-11-06 04:39:59'),
(2,'Health & Medicine','2021-11-06 04:39:59','2021-11-06 04:39:59'),
(3,'Computer & Electronics','2021-11-06 04:39:59','2021-11-06 04:39:59'),
(4,'Entertainment','2021-11-06 04:39:59','2021-11-06 04:39:59');

/*Table structure for table `businesses` */

DROP TABLE IF EXISTS `businesses`;

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `businessCategoryId` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `commercialImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `businesses_business_category_id` (`businessCategoryId`),
  CONSTRAINT `FkBusinessCategoryIdInBusinesses` FOREIGN KEY (`businessCategoryId`) REFERENCES `business_categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `businesses` */

insert  into `businesses`(`id`,`name`,`businessCategoryId`,`description`,`phone`,`email`,`street`,`city`,`state`,`country`,`postalCode`,`logo`,`commercialImage`,`createdAt`,`updatedAt`) values 
(1,'Starbucks Bali 2',3,'-','022-1234-1234','arifrhakim29@gmail.com','Jalan Jaksanaranata no. 150','Bandung','West Java','Indonesia','40375','dnSEWn2pXO.jpg','contoh.jpg','2021-11-06 04:39:59','2021-11-07 16:12:27');

/*Table structure for table `day_offs` */

DROP TABLE IF EXISTS `day_offs`;

CREATE TABLE `day_offs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameOfDay` varchar(50) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `businessId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `day_offs_business_id` (`businessId`),
  CONSTRAINT `FkBusinessIdInDayOffs` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `day_offs` */

insert  into `day_offs`(`id`,`nameOfDay`,`dateStart`,`dateEnd`,`businessId`,`createdAt`,`updatedAt`) values 
(1,'New Years Holiday','2021-12-31','2022-01-01',1,'2021-11-06 04:39:59','2021-11-06 04:39:59'),
(2,'Thanks Giving','2022-01-17','2022-01-18',1,'2021-11-06 04:39:59','2021-11-06 04:39:59'),
(4,'Valentine\'s Day','2021-12-01','2021-12-02',1,'2021-11-08 16:49:07','2021-11-08 16:49:07');

/*Table structure for table `legal_informations` */

DROP TABLE IF EXISTS `legal_informations`;

CREATE TABLE `legal_informations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `headOfCompany` varchar(255) NOT NULL,
  `taxNumber` varchar(255) DEFAULT NULL,
  `ustId` varchar(255) DEFAULT NULL,
  `businessId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `legal_informations_business_id` (`businessId`),
  CONSTRAINT `FkBusinessIdInLegalInformations` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `legal_informations` */

insert  into `legal_informations`(`id`,`companyName`,`headOfCompany`,`taxNumber`,`ustId`,`businessId`,`createdAt`,`updatedAt`) values 
(1,'Starbucks Corporation','Jonathan O\'Shea',NULL,NULL,1,'2021-11-06 04:39:59','2021-11-07 11:47:28');

/*Table structure for table `opening_hours` */

DROP TABLE IF EXISTS `opening_hours`;

CREATE TABLE `opening_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) DEFAULT NULL,
  `timeStart` time NOT NULL,
  `timeEnd` time NOT NULL,
  `businessId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `opening_hours_business_id` (`businessId`),
  CONSTRAINT `FkBusinessIdInOpeningHours` FOREIGN KEY (`businessId`) REFERENCES `businesses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `opening_hours` */

insert  into `opening_hours`(`id`,`day`,`timeStart`,`timeEnd`,`businessId`,`createdAt`,`updatedAt`) values 
(4,0,'10:00:00','17:00:00',1,'2021-11-06 04:39:59','2021-11-08 06:59:45'),
(10,0,'09:00:00','10:00:00',1,'2021-11-08 16:12:38','2021-11-08 16:12:38'),
(11,0,'17:00:00','20:00:00',1,'2021-11-08 16:15:51','2021-11-08 16:15:51');

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('20211107171254-change_column_day_in_opening_hours.js');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
