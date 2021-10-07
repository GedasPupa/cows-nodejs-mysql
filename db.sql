CREATE SCHEMA `cows_farm` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

CREATE TABLE `cows_farm`.`cows` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `weight` DECIMAL(6,2) NOT NULL,
  `total_milk` DECIMAL(7,1) NULL,
  `last_milk_time` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

INSERT INTO `cows_farm`.`cows` (`id`, `name`, `weight`, `total_milk`, `last_milk_time`) 
VALUES ('1', 'Žala', '100', '10', '2021-10-07');
-- INSERT INTO `cows_farm`.`cows` (`name`, `weight`, `total_milk`, `last_milk_time`) 
-- VALUES ('Marga', '110', '12', '2021-10-07');
select * from cows;
