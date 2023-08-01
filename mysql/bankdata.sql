-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema test1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`userinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`userinfo` (
  `userid` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`saveinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`saveinfo` (
  `saveid` INT NOT NULL,
  `savemoney` INT NOT NULL,
  `userinfo_userid` INT NOT NULL,
  PRIMARY KEY (`saveid`),
  INDEX `fk_saveinfo_userinfo1_idx` (`userinfo_userid` ASC) VISIBLE,
  CONSTRAINT `fk_saveinfo_userinfo1`
    FOREIGN KEY (`userinfo_userid`)
    REFERENCES `mydb`.`userinfo` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bankinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bankinfo` (
  `bankid` INT NOT NULL,
  `bankname` VARCHAR(45) NOT NULL,
  `userinfo_userid` INT NOT NULL,
  `saveinfo_saveid` INT NOT NULL,
  PRIMARY KEY (`bankid`),
  INDEX `fk_bankinfo_userinfo1_idx` (`userinfo_userid` ASC) VISIBLE,
  INDEX `fk_bankinfo_saveinfo1_idx` (`saveinfo_saveid` ASC) VISIBLE,
  CONSTRAINT `fk_bankinfo_userinfo1`
    FOREIGN KEY (`userinfo_userid`)
    REFERENCES `mydb`.`userinfo` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bankinfo_saveinfo1`
    FOREIGN KEY (`saveinfo_saveid`)
    REFERENCES `mydb`.`saveinfo` (`saveid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`accountinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`accountinfo` (
  `accountid` INT NOT NULL,
  `accountnumber` VARCHAR(45) NOT NULL,
  `userinfo_userid` INT NOT NULL,
  `bankinfo_bankid` INT NOT NULL,
  PRIMARY KEY (`accountid`),
  INDEX `fk_accountinfo_userinfo1_idx` (`userinfo_userid` ASC) VISIBLE,
  INDEX `fk_accountinfo_bankinfo1_idx` (`bankinfo_bankid` ASC) VISIBLE,
  CONSTRAINT `fk_accountinfo_userinfo1`
    FOREIGN KEY (`userinfo_userid`)
    REFERENCES `mydb`.`userinfo` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_accountinfo_bankinfo1`
    FOREIGN KEY (`bankinfo_bankid`)
    REFERENCES `mydb`.`bankinfo` (`bankid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`loaninfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`loaninfo` (
  `loanid` INT NOT NULL,
  `ioanmoney` INT NOT NULL,
  `userinfo_userid` INT NOT NULL,
  `bankinfo_bankid` INT NOT NULL,
  PRIMARY KEY (`loanid`),
  INDEX `fk_loaninfo_userinfo1_idx` (`userinfo_userid` ASC) VISIBLE,
  INDEX `fk_loaninfo_bankinfo1_idx` (`bankinfo_bankid` ASC) VISIBLE,
  CONSTRAINT `fk_loaninfo_userinfo1`
    FOREIGN KEY (`userinfo_userid`)
    REFERENCES `mydb`.`userinfo` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loaninfo_bankinfo1`
    FOREIGN KEY (`bankinfo_bankid`)
    REFERENCES `mydb`.`bankinfo` (`bankid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cardinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cardinfo` (
  `cardid` INT NOT NULL,
  `cardnumber` INT NOT NULL,
  `userinfo_userid` INT NOT NULL,
  `accountinfo_accountid` INT NOT NULL,
  PRIMARY KEY (`cardid`),
  INDEX `fk_cardinfo_userinfo_idx` (`userinfo_userid` ASC) VISIBLE,
  INDEX `fk_cardinfo_accountinfo1_idx` (`accountinfo_accountid` ASC) VISIBLE,
  CONSTRAINT `fk_cardinfo_userinfo`
    FOREIGN KEY (`userinfo_userid`)
    REFERENCES `mydb`.`userinfo` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cardinfo_accountinfo1`
    FOREIGN KEY (`accountinfo_accountid`)
    REFERENCES `mydb`.`accountinfo` (`accountid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `test1` ;

-- -----------------------------------------------------
-- Table `test1`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test1`.`user_info` (
  `id` INT NULL DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `gender` VARCHAR(50) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
