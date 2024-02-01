-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for class_offline
CREATE DATABASE IF NOT EXISTS `class_offline` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `class_offline`;

-- Dumping structure for table class_offline.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.classes: ~0 rows (approximately)
INSERT INTO `classes` (`id`, `name`, `quantity`, `startDate`, `endDate`, `courseId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Back End K1', 29, '2024-02-01 07:00:00', '2024-08-22 07:00:00', 1, '2024-02-01 13:17:35', '2024-02-01 13:17:35'),
	(2, 'Back End K2', 29, '2024-02-04 07:00:00', '2024-05-16 07:00:00', 1, '2024-02-01 13:19:27', '2024-02-01 14:45:20');

-- Dumping structure for table class_offline.classes_teachers
CREATE TABLE IF NOT EXISTS `classes_teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classes_teachers_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`),
  CONSTRAINT `classes_teachers_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.classes_teachers: ~3 rows (approximately)
INSERT INTO `classes_teachers` (`id`, `teacherId`, `classId`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, '2024-02-01 14:39:42', '2024-02-01 14:39:42'),
	(2, 2, 2, '2024-02-01 14:45:39', '2024-02-01 14:45:39'),
	(3, 1, 1, '2024-02-01 14:47:59', '2024-02-01 14:47:59');

-- Dumping structure for table class_offline.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.comments: ~0 rows (approximately)
INSERT INTO `comments` (`id`, `classId`, `title`, `content`, `parentId`, `studentId`, `attachment`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Link CSS', 'Làm thế nào để link CSS', 0, 1, '', '2024-02-01 14:07:57', '2024-02-01 14:07:57'),
	(2, 1, 'Link file JS', 'Làm thế nào để link JS', 0, 1, '', '2024-02-01 14:41:40', '2024-02-01 14:41:40');

-- Dumping structure for table class_offline.coursemodules
CREATE TABLE IF NOT EXISTS `coursemodules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `coursemodules_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.coursemodules: ~0 rows (approximately)
INSERT INTO `coursemodules` (`id`, `name`, `courseId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nhập môn lập trình web', 1, '2024-02-01 14:35:29', '2024-02-01 14:35:29');

-- Dumping structure for table class_offline.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `teacherId` int(11) DEFAULT NULL,
  `tryLearn` tinyint(1) DEFAULT 0,
  `quantity` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.courses: ~1 rows (approximately)
INSERT INTO `courses` (`id`, `name`, `price`, `teacherId`, `tryLearn`, `quantity`, `duration`, `createdAt`, `updatedAt`) VALUES
	(1, 'Fullstack K1', 36000000, 3, 0, 15, 29, '2024-02-01 11:32:07', '2024-02-01 11:32:22'),
	(2, 'Back End K1', 15000000, 2, 0, 15, 48, '2024-02-01 14:39:13', '2024-02-01 14:39:13');

-- Dumping structure for table class_offline.exercises
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.exercises: ~0 rows (approximately)
INSERT INTO `exercises` (`id`, `classId`, `title`, `content`, `attachment`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Bài tập buổi 1', 'Làm CRUD User', 'https://www.google.com', '2024-02-01 13:59:24', '2024-02-01 13:59:24'),
	(2, 1, 'Bài tập buổi 2', 'Làm CRUD User', '', '2024-02-01 14:42:20', '2024-02-01 14:42:20');

-- Dumping structure for table class_offline.exercisessubmits
CREATE TABLE IF NOT EXISTS `exercisessubmits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `exerciseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `exerciseId` (`exerciseId`),
  CONSTRAINT `exercisessubmits_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `exercisessubmits_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.exercisessubmits: ~0 rows (approximately)
INSERT INTO `exercisessubmits` (`id`, `studentId`, `content`, `attachment`, `exerciseId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Em nộp bài ạ:', 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox', 2, '2024-02-01 14:42:54', '2024-02-01 14:42:54');

-- Dumping structure for table class_offline.learningstatuses
CREATE TABLE IF NOT EXISTS `learningstatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.learningstatuses: ~3 rows (approximately)
INSERT INTO `learningstatuses` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Studying', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(2, 'Dropout', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(3, 'Reserve', '2024-02-01 11:23:00', '2024-02-01 11:23:00');

-- Dumping structure for table class_offline.logintokens
CREATE TABLE IF NOT EXISTS `logintokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(100) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `logintokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.logintokens: ~1 rows (approximately)
INSERT INTO `logintokens` (`id`, `token`, `userId`, `createdAt`, `updatedAt`) VALUES
	(4, '5cbdf033d1581cd2f25c959dfb6d591a', 1, '2024-02-01 14:32:12', '2024-02-01 14:32:12');

-- Dumping structure for table class_offline.moduledocuments
CREATE TABLE IF NOT EXISTS `moduledocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `pathName` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `moduledocuments_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `coursemodules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.moduledocuments: ~1 rows (approximately)
INSERT INTO `moduledocuments` (`id`, `content`, `pathName`, `moduleId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nhập môn lập trình web 2', 'https://docs.google.com/presentation/d/1EfrKYnOB_XWKvceNa4zW2xLsyZ2H58yM/edit#slide=id.p1', 1, '2024-02-01 14:35:43', '2024-02-01 14:35:43');

-- Dumping structure for table class_offline.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `values` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.permissions: ~25 rows (approximately)
INSERT INTO `permissions` (`id`, `values`, `createdAt`, `updatedAt`) VALUES
	(1, 'users.read', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(2, 'users.permission', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(3, 'roles.read', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(4, 'roles.add', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(5, 'roles.update', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(6, 'users.add', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(7, 'users.update', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(8, 'users.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(9, 'roles.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(10, 'courses.add', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(11, 'courses.read', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(12, 'courses.update', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(13, 'classes.read', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(14, 'classes.add', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(15, 'classes.update', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(16, 'classes.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(17, 'teachers.read', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(18, 'teachers.add', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(19, 'teachers.update', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(20, 'teachers.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(21, 'students.read', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(22, 'students.add', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(23, 'students.update', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(24, 'students.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(25, 'courses.delete', '2024-02-01 11:24:55', '2024-02-01 11:24:55');

-- Dumping structure for table class_offline.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.roles: ~1 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Super Admin', '2024-02-01 11:23:00', '2024-02-01 14:38:23');

-- Dumping structure for table class_offline.role_permission
CREATE TABLE IF NOT EXISTS `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.role_permission: ~25 rows (approximately)
INSERT INTO `role_permission` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(2, 1, 2, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(3, 1, 3, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(4, 1, 4, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(5, 1, 5, '2024-02-01 11:24:20', '2024-02-01 11:24:20'),
	(6, 1, 6, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(8, 1, 7, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(9, 1, 8, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(10, 1, 9, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(11, 1, 11, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(18, 1, 18, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(19, 1, 19, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(20, 1, 20, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(22, 1, 22, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(23, 1, 23, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(24, 1, 24, '2024-02-01 11:24:55', '2024-02-01 11:24:55'),
	(26, 1, 13, '2024-02-01 14:34:43', '2024-02-01 14:34:43'),
	(27, 1, 17, '2024-02-01 14:34:43', '2024-02-01 14:34:43'),
	(28, 1, 21, '2024-02-01 14:34:43', '2024-02-01 14:34:43'),
	(29, 1, 10, '2024-02-01 14:38:23', '2024-02-01 14:38:23'),
	(30, 1, 12, '2024-02-01 14:38:23', '2024-02-01 14:38:23'),
	(31, 1, 25, '2024-02-01 14:38:23', '2024-02-01 14:38:23'),
	(32, 1, 14, '2024-02-01 14:38:23', '2024-02-01 14:38:23'),
	(33, 1, 15, '2024-02-01 14:38:23', '2024-02-01 14:38:23'),
	(34, 1, 16, '2024-02-01 14:38:23', '2024-02-01 14:38:23');

-- Dumping structure for table class_offline.scheduleclasses
CREATE TABLE IF NOT EXISTS `scheduleclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule` tinyint(1) DEFAULT NULL,
  `timeLearn` varchar(255) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `scheduleclasses_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.scheduleclasses: ~3 rows (approximately)
INSERT INTO `scheduleclasses` (`id`, `schedule`, `timeLearn`, `classId`, `createdAt`, `updatedAt`) VALUES
	(1, 2, '15:00 - 18:00', 1, '2024-02-01 13:17:35', '2024-02-01 13:17:35'),
	(4, 2, '21:00 - 00:00', 2, '2024-02-01 14:45:20', '2024-02-01 14:45:20'),
	(5, 4, '03:00 - 06:00', 2, '2024-02-01 14:45:20', '2024-02-01 14:45:20');

-- Dumping structure for table class_offline.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table class_offline.sequelizemeta: ~25 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20231122024548-create-type.js'),
	('20231122024700-create-user.js'),
	('20231122024910-create-user-otp.js'),
	('20231122025151-create-user-column.js'),
	('20231122025912-create-user-social.js'),
	('20231122030153-create-login-token.js'),
	('20231122030554-create-role.js'),
	('20231122030815-create-permission.js'),
	('20231122031229-User_Role.js'),
	('20231122031614-Role_Permission.js'),
	('20231122031935-User_Permission.js'),
	('20231122032254-create-course.js'),
	('20231122032643-create-course-module.js'),
	('20231122032901-create-module-document.js'),
	('20231122033243-create-class.js'),
	('20231122034058-Classes_Teachers.js'),
	('20231122034752-create-teacher-calendar.js'),
	('20231122035036-create-learning-status.js'),
	('20231122035403-create-students-class.js'),
	('20231122035653-create-students-attendance.js'),
	('20231122035901-create-exercise.js'),
	('20231122040146-create-exercises-submit.js'),
	('20231122040419-create-comment.js'),
	('20231122040801-create-setting.js'),
	('20231228104254-create-schedule-class.js');

-- Dumping structure for table class_offline.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otpKey` varchar(200) DEFAULT NULL,
  `otpValue` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.settings: ~0 rows (approximately)

-- Dumping structure for table class_offline.studentsattendances
CREATE TABLE IF NOT EXISTS `studentsattendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateLearn` datetime DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `studentsattendances_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentsattendances_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `studentsattendances_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.studentsattendances: ~0 rows (approximately)
INSERT INTO `studentsattendances` (`id`, `dateLearn`, `studentId`, `classId`, `statusId`, `status`, `createdAt`, `updatedAt`) VALUES
	(4, '2024-02-13 00:00:00', 5, 1, 1, 2, '2024-02-01 14:40:43', '2024-02-01 14:40:43'),
	(5, '2024-02-06 00:00:00', 5, 1, 1, 2, '2024-02-01 14:40:43', '2024-02-01 14:40:43');

-- Dumping structure for table class_offline.studentsclasses
CREATE TABLE IF NOT EXISTS `studentsclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completeDate` datetime DEFAULT NULL,
  `dropDate` datetime DEFAULT NULL,
  `recover` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `studentsclasses_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentsclasses_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `studentsclasses_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.studentsclasses: ~0 rows (approximately)
INSERT INTO `studentsclasses` (`id`, `studentId`, `classId`, `statusId`, `completeDate`, `dropDate`, `recover`, `createdAt`, `updatedAt`) VALUES
	(1, 5, 1, 1, NULL, NULL, NULL, '2024-02-01 14:21:08', '2024-02-01 14:21:08');

-- Dumping structure for table class_offline.teachercalendars
CREATE TABLE IF NOT EXISTS `teachercalendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `scheduleDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `teachercalendars_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`),
  CONSTRAINT `teachercalendars_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.teachercalendars: ~0 rows (approximately)

-- Dumping structure for table class_offline.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.types: ~4 rows (approximately)
INSERT INTO `types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(2, 'Teacher', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(3, 'TA', '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(4, 'Student', '2024-02-01 11:23:00', '2024-02-01 11:23:00');

-- Dumping structure for table class_offline.usercolumns
CREATE TABLE IF NOT EXISTS `usercolumns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `featureName` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `usercolumns_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.usercolumns: ~0 rows (approximately)

-- Dumping structure for table class_offline.userotps
CREATE TABLE IF NOT EXISTS `userotps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otp` (`otp`),
  KEY `userId` (`userId`),
  CONSTRAINT `userotps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.userotps: ~0 rows (approximately)
INSERT INTO `userotps` (`id`, `otp`, `userId`, `expires`, `createdAt`, `updatedAt`) VALUES
	(4, '10963', 1, '2024-02-01 14:33:12', '2024-02-01 14:32:12', '2024-02-01 14:32:12');

-- Dumping structure for table class_offline.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `typeId`, `firstLogin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Nguyễn Khải 12', 'nguyenhuukhai1303@gmail.com', '$2b$10$rY99YGCQ05RFoPoun0TT7.WVOZj5SgjdiLcTJYoMtZ/iYO7OZwcS6', '012354631', 'Hà Nội', 1, 0, '2024-02-01 11:23:00', '2024-02-01 14:38:06'),
	(2, 'Sơn Đặng', 'sondang@gmail.com', '$2b$10$wr9x3WyaL54q30mf0dvh0e7FnAyQajlUDY3QXmIKhs59d68SWZbHO', '012354631', 'Hà Nội', 2, 0, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(3, 'Hoàng An', 'hoangan@gmail.com', '$2b$10$2VR91thyjANVaM3ePKUvNuwzsObq/90fKq2QxX5dva4ehxHEQjMSm', '012354631', 'Hà Nội', 2, 0, '2024-02-01 11:23:00', '2024-02-01 11:23:00'),
	(5, 'Khải ', 'khai12@gmail.com', NULL, '0963690416', 'HN', 4, 0, '2024-02-01 14:19:43', '2024-02-01 14:19:43');

-- Dumping structure for table class_offline.usersocials
CREATE TABLE IF NOT EXISTS `usersocials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `usersocials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.usersocials: ~0 rows (approximately)
INSERT INTO `usersocials` (`id`, `userId`, `provider`, `providerId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'github', '88968648', '2024-02-01 11:31:26', '2024-02-01 11:31:26');

-- Dumping structure for table class_offline.user_permissions
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.user_permissions: ~0 rows (approximately)

-- Dumping structure for table class_offline.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table class_offline.user_role: ~1 rows (approximately)
INSERT INTO `user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-01 11:23:00', '2024-02-01 11:23:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
