CREATE TABLE `adriatictraveljournaldb`.`codes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `activated` TINYINT NOT NULL,
  `FK_userId` INT NULL,
  `location` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `winner` TINYINT NOT NULL,
  `place` INT NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_userId_idx` (`FK_userId` ASC) VISIBLE,
  CONSTRAINT `FK_userId`
    FOREIGN KEY (`FK_userId`)
    REFERENCES `adriatictraveljournaldb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);