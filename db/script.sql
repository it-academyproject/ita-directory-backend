-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema it_academy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema it_academy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `it_academy` DEFAULT CHARACTER SET utf8 ;
USE `it_academy` ;

-- -----------------------------------------------------
-- Table `it_academy`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`user_role` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `admin` TINYINT NULL DEFAULT '0',
  `manager` TINYINT NULL DEFAULT '0',
  `registered` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `it_academy`.`user_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`user_status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT '0',
  `pending` TINYINT NOT NULL DEFAULT '0',
  `suspended` TINYINT NOT NULL DEFAULT '0',
  `deleted` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `it_academy`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `lastnames` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `user_status_id` INT NOT NULL,
  `user_role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_user_status_idx` (`user_status_id` ASC) VISIBLE,
  INDEX `fk_user_user_role1_idx` (`user_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_user_role1`
    FOREIGN KEY (`user_role_id`)
    REFERENCES `it_academy`.`user_role` (`id`),
  CONSTRAINT `fk_user_user_status`
    FOREIGN KEY (`user_status_id`)
    REFERENCES `it_academy`.`user_status` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `it_academy`.`access_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`access_log` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `login` DATETIME NULL DEFAULT NULL,
  `logout` DATETIME NULL DEFAULT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_access_log_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_access_log_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `it_academy`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `it_academy`.`recover_password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`recover_password` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hash` TEXT NOT NULL,
  `expire_time` TIMESTAMP NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_recover_password_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_recover_password_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `it_academy`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `it_academy`.`media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`media` (
  `id` INT NULL AUTO_INCREMENT,
  `path` TEXT NULL,
  `mime_type` VARCHAR(45) NULL,
  `file_size` VARCHAR(45) NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_media_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_media_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `it_academy`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `it_academy`.`conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`conversation` (
  `user_id_one` INT UNSIGNED NOT NULL,
  `user_id_two` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `fk_conversation_user1_idx` (`user_id_one` ASC) VISIBLE,
  INDEX `fk_conversation_user2_idx` (`user_id_two` ASC) VISIBLE,
  PRIMARY KEY (`user_id_one`, `user_id_two`),
  CONSTRAINT `fk_conversation_user1`
    FOREIGN KEY (`user_id_one`)
    REFERENCES `it_academy`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_conversation_user2`
    FOREIGN KEY (`user_id_two`)
    REFERENCES `it_academy`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `it_academy`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `it_academy`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation_user_id_one` INT UNSIGNED NOT NULL,
  `conversation_user_id_two` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_conversation1_idx` (`conversation_user_id_one` ASC, `conversation_user_id_two` ASC) VISIBLE,
  INDEX `fk_message_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_conversation1`
    FOREIGN KEY (`conversation_user_id_one` , `conversation_user_id_two`)
    REFERENCES `it_academy`.`conversation` (`user_id_one` , `user_id_two`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `it_academy`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
