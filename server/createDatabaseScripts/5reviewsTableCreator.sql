CREATE TABLE `adriatictraveljournaldb`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `review` VARCHAR(200) NOT NULL,
  `rate` INT NOT NULL,
  `FK_user_review` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `createdAt` VARCHAR(45) NULL,
  `updatedAt` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_user_review_idx` (`FK_user_review` ASC) VISIBLE,
  CONSTRAINT `FK_user_review`
    FOREIGN KEY (`FK_user_review`)
    REFERENCES `adriatictraveljournaldb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

