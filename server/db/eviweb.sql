-- User Table
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `uname` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    `dateCreated` DATE DEFAULT CURRENT_DATE,
    `role` ENUM('student', 'teacher', 'none') DEFAULT 'none'
);

-- Razred Table
CREATE TABLE `razred` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

-- Student Table
CREATE TABLE `student` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ime` VARCHAR(50) DEFAULT 'Dijak',
    `priimek` VARCHAR(50) DEFAULT 'Dijak',
    `email` VARCHAR(100) DEFAULT 'dijak@eviweb.org',
    `razred` INT,
    `emšo` BIGINT DEFAULT 0,
    `spol` BOOLEAN,
    `datumRojstva` DATE,
    FOREIGN KEY (`razred`) REFERENCES `razred`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Teacher Table
CREATE TABLE `teacher` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ime` VARCHAR(50) DEFAULT 'Učitelj',
    `priimek` VARCHAR(50) DEFAULT 'Učitelj',
    `email` VARCHAR(100) DEFAULT 'učitelj@eviweb.org',
    `emšo` BIGINT DEFAULT 0,
    `datumRojstva` DATE DEFAULT CURRENT_DATE,
    `isRazrednik` BOOLEAN DEFAULT FALSE,
    `razred` INT,
    `plača` INT,
    FOREIGN KEY (`razred`) REFERENCES `razred`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Parent Table
CREATE TABLE `parent` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ime` VARCHAR(50) DEFAULT 'Starš',
    `priimek` VARCHAR(50) DEFAULT 'Starš',
    `email` VARCHAR(100),
    `otrok` INT,
    FOREIGN KEY (`otrok`) REFERENCES `student`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS `subject` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL
);

-- Grade Table
CREATE TABLE `grade` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ocena` INT DEFAULT -1,
    `student` INT NOT NULL,
    `teacher` INT NOT NULL,
    `subject` INT NOT NULL,
    `date` DATE,
    FOREIGN KEY (`student`) REFERENCES `student`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`teacher`) REFERENCES `teacher`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`subject`) REFERENCES `subject`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Week Table
CREATE TABLE `week` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `start` DATE,
    `end` DATE
);

-- Timetable Table
CREATE TABLE `timetable` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `week` INT,
    FOREIGN KEY (`week`) REFERENCES `week`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Day Table
CREATE TABLE `day` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `week` INT,
    FOREIGN KEY (`week`) REFERENCES `week`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Hour Table
CREATE TABLE `hour` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dan` INT,
    `ucitelj` INT,
    `subject` INT,
    `opis` VARCHAR(255),
    FOREIGN KEY (`dan`) REFERENCES `day`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL,
    FOREIGN KEY (`ucitelj`) REFERENCES `teacher`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL,
    FOREIGN KEY (`subject`) REFERENCES `subject`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Exam Table
CREATE TABLE `exam` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `subject` INT,
    `teacher` INT,
    `hour` INT,
    FOREIGN KEY (`subject`) REFERENCES `subject`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL,
    FOREIGN KEY (`teacher`) REFERENCES `teacher`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL,
    FOREIGN KEY (`hour`) REFERENCES `hour`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Absences Table
CREATE TABLE `absences` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ura` INT,
    `student` INT,
    FOREIGN KEY (`ura`) REFERENCES `hour`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL,
    FOREIGN KEY (`student`) REFERENCES `student`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);
