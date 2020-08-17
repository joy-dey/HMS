-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2020 at 08:18 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostelmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(50) NOT NULL COMMENT 'id_no',
  `uname` varchar(50) NOT NULL COMMENT 'username_bkl',
  `pass` varchar(20) NOT NULL COMMENT 'password_bkl',
  `type` varchar(10) NOT NULL COMMENT 'type_of_user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `uname`, `pass`, `type`) VALUES
(1, 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(10) NOT NULL COMMENT 'Identification Number',
  `message` varchar(120) NOT NULL COMMENT 'Message from the Admin',
  `time` varchar(120) NOT NULL COMMENT 'News Uploaded time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rfl`
--

CREATE TABLE `rfl` (
  `id` int(10) NOT NULL,
  `type` varchar(150) NOT NULL COMMENT 'Type of Leave',
  `reason` varchar(250) NOT NULL COMMENT 'Reason for the Leave',
  `student` varchar(120) NOT NULL COMMENT 'Student Phone Number',
  `state` varchar(10) NOT NULL COMMENT 'Accept/Reject'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(50) NOT NULL COMMENT 'Identification Number',
  `room` varchar(8) NOT NULL COMMENT 'Room Number',
  `price` varchar(50) NOT NULL COMMENT 'Price of the Room',
  `state` varchar(120) NOT NULL COMMENT 'Available/Unavailable',
  `user` varchar(50) NOT NULL COMMENT 'Students Allotted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_reg`
--

CREATE TABLE `student_reg` (
  `id` int(50) NOT NULL COMMENT 'id',
  `name` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL COMMENT 'Student Phone Number',
  `pass` varchar(120) NOT NULL COMMENT 'Password',
  `f_name` varchar(50) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `course` varchar(50) NOT NULL,
  `ac_year` varchar(30) NOT NULL,
  `p_addr` varchar(60) NOT NULL,
  `p_ph` varchar(15) NOT NULL,
  `lg_name` varchar(50) NOT NULL,
  `lg_addr` varchar(60) NOT NULL,
  `lg_ph` varchar(15) NOT NULL,
  `allocation` varchar(50) NOT NULL COMMENT 'Allocation Room Number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rfl`
--
ALTER TABLE `rfl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `room` (`room`);

--
-- Indexes for table `student_reg`
--
ALTER TABLE `student_reg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT COMMENT 'id_no', AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Identification Number', AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rfl`
--
ALTER TABLE `rfl`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT COMMENT 'Identification Number', AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `student_reg`
--
ALTER TABLE `student_reg`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
