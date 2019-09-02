  CREATE TABLE `adriatictraveljournaldb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
