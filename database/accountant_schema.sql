-- accountant_local.users definition
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;



-- accountant_local.currencies definition
CREATE TABLE IF NOT EXISTS `currencies` (
  `created_at` date NOT NULL,
  `updated_at` date DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `iso` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DISABLED','DELETED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gfongft0igw84ed7kt3lbwv1c` (`iso`),
  UNIQUE KEY `UK_a2yxotynwqjrmkq71won77vui` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;



-- accountant_local.accounts definition
CREATE TABLE IF NOT EXISTS `accounts` (
  `amount` decimal(38,2) DEFAULT NULL,
  `created_at` date NOT NULL,
  `deleted_at` date DEFAULT NULL,
  `include_in_balance` tinyint(4) NOT NULL,
  `is_temporal` tinyint(4) NOT NULL,
  `updated_at` date DEFAULT NULL,
  `currency_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_account_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `color` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DISABLED','DELETED') DEFAULT NULL,
  `type` enum('GROUP','SUPPLIER','STORAGE','CONSUMER','BUSINESS','INVESTMENT','CREDITOR','DEBTOR') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs08d0ccyak63pou9tfk093dbk` (`currency_id`),
  KEY `FKnskeplq9bn5ecajq9vhufattm` (`parent_account_id`),
  KEY `FKnjuop33mo69pd79ctplkck40n` (`user_id`),
  CONSTRAINT `FKnjuop33mo69pd79ctplkck40n` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKnskeplq9bn5ecajq9vhufattm` FOREIGN KEY (`parent_account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKs08d0ccyak63pou9tfk093dbk` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;



-- accountant_local.schedule_transactions definition
CREATE TABLE IF NOT EXISTS `schedule_transactions` (
  `amount` decimal(38,2) NOT NULL,
  `interest` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_execution` datetime(6) DEFAULT NULL,
  `next_execution` datetime(6) NOT NULL,
  `origin_id` bigint(20) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `cron_expression` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DISABLED','DELETED') DEFAULT NULL,
  `type` enum('INCOME','EXPENSE','TRANSFER','INVEST','DIVIDEND','PROFIT','INTEREST','BORROW','COLLECTION','DEBT','PAYMENT') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqpxxbiypl0lt7fa3wjqg99ptk` (`destination_id`),
  KEY `FK1nxr8x1rvaxmkrn19nnse1qrp` (`origin_id`),
  KEY `FKjibjwpl2yjhdnivi65caqls02` (`user_id`),
  CONSTRAINT `FK1nxr8x1rvaxmkrn19nnse1qrp` FOREIGN KEY (`origin_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKjibjwpl2yjhdnivi65caqls02` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqpxxbiypl0lt7fa3wjqg99ptk` FOREIGN KEY (`destination_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;



-- accountant_local.transactions definition
CREATE TABLE IF NOT EXISTS `transactions` (
  `amount` decimal(38,2) NOT NULL,
  `applied` tinyint(4) NOT NULL,
  `interest` decimal(38,2) DEFAULT NULL,
  `applied_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `destination_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `origin_id` bigint(20) DEFAULT NULL,
  `saved_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `operation_type` enum('ADDITION','SUBTRACTION','NEUTER') DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED','DELETED') DEFAULT NULL,
  `type` enum('INCOME','EXPENSE','TRANSFER','INVEST','DIVIDEND','PROFIT','INTEREST','BORROW','COLLECTION','DEBT','PAYMENT') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcsb0kdvsdj55hikqj3unk926t` (`destination_id`),
  KEY `FKmo5u9bhmwutsvptf2t2b5ylvg` (`origin_id`),
  KEY `FKqwv7rmvc8va8rep7piikrojds` (`user_id`),
  CONSTRAINT `FKcsb0kdvsdj55hikqj3unk926t` FOREIGN KEY (`destination_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKmo5u9bhmwutsvptf2t2b5ylvg` FOREIGN KEY (`origin_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKqwv7rmvc8va8rep7piikrojds` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb3;



-- SEED DATA
INSERT INTO accountant.currencies(created_at, updated_at, id, color, iso, name, status)
VALUES('2024-05-25', NULL, 1, '#14B8A6', 'MXN', 'Mexican Peso', 'ACTIVE');

INSERT INTO accountant.users
(id, name, password, username, `role`)
VALUES(1, 'Admin', '$2a$10$nOZV7q2J1KA98bhoqLAT/eTkKCxqP78A44JkrFOhenA.TWhi5O1pe', 'admin@accountant.com', 'ADMIN');

INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-05-25', NULL, 0, 0, NULL, 1, 1, NULL, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Your Job', 'ACTIVE', 'SUPPLIER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-05-25', NULL, 1, 0, NULL, 1, 2, NULL, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Your Bank', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-05-25', NULL, 1, 0, NULL, 1, 3, 2, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Apart', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-05-25', NULL, 0, 0, NULL, 1, 4, NULL, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Home', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-05-25', NULL, 0, 0, NULL, 1, 5, 4, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Internet', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-05-25', NULL, 0, 0, NULL, 1, 6, 4, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Gas', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-05-25', NULL, 1, 0, NULL, 1, 7, NULL, 1, '#3B82F6', 'fa-regular fa-credit-card', 'Invest', 'ACTIVE', 'INVESTMENT');

INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(10.00, 0.00, '2024-05-25 18:17:46.410530', NULL, 2, 1, NULL, '2024-05-28 07:00:00', 1, NULL, 1, '0 0 7 28 * *', 'Income', 'ACTIVE', 'INCOME');
