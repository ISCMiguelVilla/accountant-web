INSERT INTO accountant.currencies
(created_at, updated_at, id, color, iso, name, status)
VALUES('2024-04-14', NULL, 1, '#14B8A6', 'MXN', 'Mexican Peso', 'ACTIVE');

INSERT INTO accountant.users
(id, name)
VALUES(1, 'Miguel Villa');
INSERT INTO accountant.users
(id, name)
VALUES(2, 'Angelina Reyes');

INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', NULL, 1, NULL, 1, '#CED9DB', 'fa-solid fa-briefcase', 'Jobs', 'ACTIVE', 'GROUP');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', NULL, 2, NULL, 1, '#FBC209', 'fa-solid fa-diagram-project', 'SitDigital', 'ACTIVE', 'GROUP');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 3, 2, 1, '#D1A728', 'fa-solid fa-beer-mug-empty', 'Grupo Modelo - AB InBev', 'ACTIVE', 'SUPPLIER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', NULL, 4, NULL, 1, '#F86E63', 'fa-solid fa-u', 'Ultrasist', 'ACTIVE', 'GROUP');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 5, 4, 1, '#D7062C', 'fa-solid fa-house', 'Infonavit', 'ACTIVE', 'SUPPLIER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 6, NULL, 1, '#01437E', 'fa-solid fa-angle-up', 'BBVA', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(8600.00, '2024-04-14', NULL, 1, 0, '2024-04-21', 1, 7, 6, 1, '#01437E', 'fa-solid fa-piggy-bank', 'Ahorros', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-21', 1, 8, 6, 1, '#01437E', 'fa-regular fa-credit-card', 'Otros', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', NULL, 9, NULL, 1, '#3B3B3B', 'fa-solid fa-money-bill-trend-up', 'Sofipos', 'ACTIVE', 'GROUP');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-24', 1, 10, 9, 1, '#101022', 'fa-solid fa-f', 'finsus', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(200000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 11, 10, 1, '#101022', 'fa-solid fa-f', 'Inversion 05/2023', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(60000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 12, 10, 1, '#101022', 'fa-solid fa-f', 'Inversion 11/2023', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-24', 1, 13, 9, 1, '#022A66', 'fa-solid fa-s', 'SuperTasas.com', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(100000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 14, 13, 1, '#022A66', 'fa-solid fa-s', '364 dias 31/07/2024', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(100000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 15, 13, 1, '#022A66', 'fa-solid fa-s', '364 dias 14/10/2024', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(70000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 16, 13, 1, '#022A66', 'fa-solid fa-s', '364 dias 30/10/2024', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-23', 1, 17, 9, 1, '#018B2A', 'fa-solid fa-cube', 'kubo.financiero', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(270000.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 18, 17, 1, '#018B2A', 'fa-solid fa-cube', 'Inversion 1', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-25', 1, 19, 9, 1, '#8706B9', 'fa-solid fa-n', 'NU', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(118995.52, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 20, 19, 1, '#8706B9', 'fa-solid fa-n', 'Cajita', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 21, NULL, 1, '#161B21', 'fa-solid fa-b', 'Bitso', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(32136.94, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 22, 21, 1, '#F08F1A', 'fa-brands fa-bitcoin', 'Bitcon', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 23, NULL, 1, '#075F9C', 'fa-solid fa-circle-arrow-right', 'CETES', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(150001.77, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 24, 23, 1, '#075F9C', 'fa-solid fa-circle-arrow-right', 'Folio 37529167', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(2600.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 25, NULL, 1, '#80AB69', 'fa-regular fa-money-bill-1', 'Efectivo', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', NULL, 26, NULL, 1, '#F8CD12', 'fa-solid fa-house', 'Prestamos familia', 'ACTIVE', 'GROUP');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(2488.00, '2024-04-14', NULL, 1, 0, '2024-04-20', 1, 27, 26, 1, '#EBE654', 'fa-solid fa-person', 'Emanuel', 'ACTIVE', 'CREDITOR');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 28, NULL, 1, '#74B024', 'fa-solid fa-house', 'Hogar', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 29, 28, 1, '#74B024', 'fa-solid fa-house-crack', 'Mantenimiento', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 30, 28, 1, '#AE8B46', 'fa-solid fa-fire', 'Gas', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 31, 28, 1, '#7A7CA1', 'fa-regular fa-lightbulb', 'Luz', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-14', NULL, 0, 0, '2024-04-21', 1, 32, 28, 1, '#01BFF8', 'fa-brands fa-internet-explorer', 'Internet', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, NULL, 1, 33, NULL, 2, '#14B8A6', 'fa-solid fa-angle-up', 'BBVA', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(10449.17, '2024-04-14', NULL, 1, 0, NULL, 1, 34, 33, 2, '#14B8A6', 'fa-solid fa-piggy-bank', 'Ahorros', 'ACTIVE', 'STORAGE');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(0.00, '2024-04-14', NULL, 1, 0, NULL, 1, 35, NULL, 2, '#14B8A6', 'fa-solid fa-circle-arrow-right', 'CETES', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(199996.86, '2024-04-14', NULL, 1, 0, NULL, 1, 36, 35, 2, '#14B8A6', 'fa-solid fa-circle-arrow-right', 'Folio 37529144', 'ACTIVE', 'INVESTMENT');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 37, 28, 1, '#F53333', 'fa-solid fa-burger', 'Comida rapida', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 38, 28, 1, '#8499BD', 'fa-solid fa-couch', 'Muebles y Electrodomésticos', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, '2024-04-21', 1, 39, NULL, 1, '#DDE8BD', 'fa-solid fa-football', 'Deportes y Hobbies', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 40, 39, 1, '#215EED', 'fa-solid fa-guitar', 'Guitarra', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 41, NULL, 1, '#EBD600', 'fa-solid fa-bus', 'Transporte', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 42, 41, 1, '#EBD600', 'fa-solid fa-taxi', 'Taxi especial', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, NULL, 1, 44, NULL, 1, '#E354FF', 'fa-solid fa-people-roof', 'Familia', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-15', NULL, 0, 0, '2024-04-15', 1, 43, 44, 1, '#E09BFA', 'fa-solid fa-person-dress', 'Mami', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-17', NULL, 0, 0, NULL, 1, 45, 44, 1, '#3B82F6', 'fa-solid fa-tooth', 'Dentista', 'ACTIVE', 'CONSUMER');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(106.00, '2024-04-17', NULL, 1, 0, NULL, 1, 46, 26, 1, '#3B82F6', 'fa-solid fa-person', 'Adrian', 'ACTIVE', 'CREDITOR');
INSERT INTO accountant.accounts
(amount, created_at, deleted_at, include_in_balance, is_temporal, updated_at, currency_id, id, parent_account_id, user_id, color, icon, name, status, `type`)
VALUES(NULL, '2024-04-17', NULL, 0, 0, NULL, 1, 47, NULL, 1, '#FF0000', 'fa-solid fa-triangle-exclamation', 'Perdidas', 'ACTIVE', 'CONSUMER');

INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(31000.00, 0.00, '2024-04-14 11:02:25.937', NULL, 6, 1, '2024-04-25 23:34:41.547', '2024-04-28 07:00:00.000', 3, '2024-04-25 17:40:24.314', 1, '0 0 7 28 * *', 'Nomina', 'ACTIVE', 'INCOME');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(2000.00, 0.00, '2024-04-14 11:04:04.272', NULL, 28, 2, '2024-04-21 19:16:12.382', '2024-04-27 07:00:00.000', 6, '2024-04-21 13:16:59.199', 1, '0 0 7 * * 6', 'Gastos de la semana', 'ACTIVE', 'EXPENSE');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(3783.74, 0.00, '2024-04-14 11:07:58.956', NULL, 6, 3, NULL, '2024-04-28 07:00:00.000', 5, NULL, 1, '0 0 7 15,28 * *', 'Quincena por nomina', 'ACTIVE', 'INCOME');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(15432.52, 0.00, '2024-04-14 11:09:02.650', NULL, 6, 4, NULL, '2024-04-28 07:00:00.000', 5, NULL, 1, '0 0 7 28 * *', 'Mensualidad por honorarios', 'ACTIVE', 'INCOME');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(2400.00, 0.00, '2024-04-14 11:16:18.237', NULL, 10, 5, NULL, '2024-04-28 07:00:00.000', 11, NULL, 1, '0 0 7 28 * *', 'Pago de Rendimientos', 'ACTIVE', 'DIVIDEND');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(700.00, 0.00, '2024-04-14 11:17:11.619', NULL, 10, 6, '2024-04-23 19:47:22.161', '2024-05-01 07:00:00.000', 12, '2024-04-23 13:49:19.770', 1, '0 0 7 1 * *', 'Pago de Rendimientos', 'ACTIVE', 'DIVIDEND');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(3100.00, 0.00, '2024-04-14 11:21:23.217', NULL, 6, 7, NULL, '2024-05-02 07:00:00.000', 10, NULL, 1, '0 0 7 2 * *', 'Profit FINSUS', 'ACTIVE', 'PROFIT');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(1000.00, 0.00, '2024-04-14 11:34:19.411', NULL, 13, 8, NULL, '2024-05-01 07:00:00.000', 14, NULL, 1, '0 0 7 1 * *', 'PAGO CEDE. INTERES GRAVADO', 'ACTIVE', 'DIVIDEND');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(1000.00, 0.00, '2024-04-14 11:35:14.100', NULL, 13, 9, NULL, '2024-05-01 07:00:00.000', 15, NULL, 1, '0 0 7 1 * *', 'PAGO CEDE. INTERES GRAVADO', 'ACTIVE', 'DIVIDEND');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(700.00, 0.00, '2024-04-14 11:36:08.795', NULL, 13, 10, NULL, '2024-05-01 07:00:00.000', 16, NULL, 1, '0 0 7 1 * *', 'PAGO CEDE. INTERES GRAVADO', 'ACTIVE', 'DIVIDEND');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(2800.00, 0.00, '2024-04-14 11:41:07.412', NULL, 17, 11, NULL, '2024-04-28 07:00:00.000', 18, NULL, 1, '0 0 7 28 * *', 'Pago interes Inversion', 'ACTIVE', 'PROFIT');
INSERT INTO accountant.schedule_transactions
(amount, interest, created_at, deleted_at, destination_id, id, last_execution, next_execution, origin_id, updated_at, user_id, cron_expression, description, status, `type`)
VALUES(2800.00, 0.00, '2024-04-14 11:42:04.442', NULL, 6, 12, NULL, '2024-04-28 07:00:00.000', 17, NULL, 1, '0 0 7 28 * *', 'Profit kubo.financiero', 'ACTIVE', 'PROFIT');

--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(350.00, 1, 0.00, '2024-04-13 17:50:12.000', '2024-04-15 21:50:40.457', NULL, 28, 16, 25, '2024-04-13 17:50:12.000', NULL, 1, 'Pago castillo fiesta patronal', '83dbd1dd-12b1-45e1-83ca-97661772cfef', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(300.00, 1, 0.00, '2024-04-14 15:08:26.000', '2024-04-15 21:50:40.457', NULL, 43, 17, 25, '2024-04-14 15:08:26.000', NULL, 1, 'Compras feria del pulque', 'e6319d3a-d875-40fd-be90-dbe3f38575b8', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(9374.00, 1, 0.00, '2024-04-14 20:17:02.000', '2024-04-15 21:50:40.457', NULL, 6, 18, 7, '2024-04-14 20:17:02.000', NULL, 1, 'TRANSFER from Ahorros to BBVA', '7fbc0a58-e17b-45e5-8b13-6d9352d5c47e', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(7140.00, 1, 0.00, '2024-04-14 20:24:22.000', '2024-04-15 21:50:40.457', NULL, 40, 19, 6, '2024-04-14 20:24:22.000', NULL, 1, 'Valeton GP200 Procesador multiefectos + bolsa de concierto, paquete negro', 'ad472526-e957-4d8c-8282-f07468c6aeeb', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(200.00, 1, 0.00, '2024-04-14 20:30:44.000', '2024-04-15 21:50:40.458', NULL, 25, 20, 6, '2024-04-14 20:30:44.000', NULL, 1, 'Compra de cerveza Esteban me pago con efectivo', 'b7c0b8b5-b5c9-475c-baf5-1803d7ad344f', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(34.00, 1, 0.00, '2024-04-14 20:32:58.000', '2024-04-15 21:50:40.458', NULL, 37, 21, 6, '2024-04-14 20:32:58.000', NULL, 1, 'Compra de cerveza', '73d85ac1-2871-4eee-8e54-e43e4ab6478b', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(300.00, 1, 0.00, '2024-04-14 21:09:12.000', '2024-04-15 21:50:40.458', NULL, 37, 22, 25, '2024-04-14 21:09:12.000', NULL, 1, 'Quesadillas feria del pulque', 'e3ecbdbf-344d-41d3-b91b-adbb81cd32a6', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(2000.00, 1, 0.00, '2024-04-15 21:25:39.313', '2024-04-15 21:50:40.458', NULL, 25, 23, 6, '2024-04-14 21:25:39.000', NULL, 1, 'TRANSFER from BBVA to Efectivo', 'd8c95e63-5e58-4e30-b65c-a2b390e836c7', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(100.00, 1, 0.00, '2024-04-14 23:10:10.000', '2024-04-15 21:50:40.458', NULL, 41, 24, 25, '2024-04-14 23:10:10.000', NULL, 1, 'Viaje a felia del pulque', '831964bc-7429-4b6f-8020-3561c62f4e20', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(2000.00, 1, 0.00, '2024-04-15 02:42:55.000', '2024-04-15 21:50:40.458', NULL, 28, 25, 25, '2024-04-15 02:42:55.000', NULL, 1, 'Gastos de la semana', 'f456f4c8-1950-4f23-ae0b-1b948b0ea660', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(3783.74, 1, 0.00, '2024-04-15 08:39:54.121', '2024-04-15 21:50:40.458', NULL, 6, 26, 5, '2024-04-15 08:39:54.121', NULL, 1, 'Quincena por nomina', '3bbb2a32-c05e-40a3-ac21-67d6901477ce', 'ADDITION', 'ACTIVE', 'INCOME');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(1000.71, 1, 0.00, '2024-04-15 21:39:18.928', '2024-04-15 21:50:40.458', NULL, 6, 27, 13, '2024-04-15 21:39:18.928', NULL, 1, 'PROFIT from SuperTasas.com to BBVA', 'a7078dc9-1b46-4801-bcd0-586baab6b443', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(20215.55, 1, 0.00, '2024-04-16 03:40:20.083', '2024-04-15 21:50:40.458', NULL, 6, 28, 7, '2024-04-16 03:40:20.083', NULL, 1, 'TRANSFER from Ahorros to BBVA', '29450796-514b-47b9-9a72-99b5ef930fe0', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(25000.00, 1, 0.00, '2024-04-16 03:45:34.880', '2024-04-15 21:50:40.458', NULL, 20, 29, 6, '2024-04-16 03:45:34.880', NULL, 1, 'INVEST from BBVA to Cajita', '03a6cfd7-aa40-4c20-95f6-10a3a7e4e055', 'NEUTER', 'ACTIVE', 'INVEST');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(24.70, 1, 0.00, '2024-04-16 03:46:12.793', '2024-04-15 21:50:40.458', NULL, NULL, 30, 20, '2024-04-16 03:46:12.793', NULL, 1, 'DIVIDEND from Cajita', '2e697e82-f897-4a52-8669-dc92b0978cb7', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(18000.00, 1, 0.00, '2024-04-16 14:25:12.042', '2024-04-16 08:26:43.919', NULL, 20, 31, 7, '2024-04-16 14:25:12.042', NULL, 1, 'INVEST from Ahorros to NU', 'ab5f298e-3bf9-458f-ab05-ff7eb18d6464', 'NEUTER', 'ACTIVE', 'INVEST');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(34.54, 1, 0.00, '2024-04-16 17:30:58.227', '2024-04-16 11:34:15.479', NULL, NULL, 32, 20, '2024-04-16 17:30:58.227', NULL, 1, 'DIVIDEND from Cajita', 'e3cf4f20-ee50-47c6-b11c-9ee027be0d75', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(3000.00, 1, 0.00, '2024-04-18 04:13:23.028', '2024-04-17 22:34:37.978', NULL, 6, 33, 20, '2024-04-18 04:13:23.028', NULL, 1, 'PROFIT from Cajita to BBVA', '1bd2a9b0-2ebd-43d1-a791-301621c796f3', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(41.11, 1, 0.00, '2024-04-18 04:15:32.254', '2024-04-17 22:34:37.978', NULL, NULL, 34, 20, '2024-04-18 04:15:32.254', NULL, 1, 'DIVIDEND from Cajita', '29fbee5c-03b4-48f7-a945-6ba7e04cac3c', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(724.00, 1, 0.00, '2024-04-18 04:17:12.603', '2024-04-17 22:34:37.978', NULL, 31, 35, 6, '2024-04-18 04:17:12.603', NULL, 1, 'Pago dos meses de luz y gasto reconexion', 'fb05a90f-9a8a-4909-8004-b694730195a3', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(800.00, 1, 0.00, '2024-04-18 04:21:57.084', '2024-04-17 22:34:37.979', NULL, 45, 36, 7, '2024-04-18 04:21:57.084', NULL, 1, 'Limpieza mami', '7a0d5303-abf5-4112-8895-45fbaee9c972', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(106.00, 1, 0.00, '2024-04-18 04:23:56.752', '2024-04-17 22:34:37.979', NULL, 46, 37, 7, '2024-04-18 04:23:56.752', NULL, 1, 'BORROW from Ahorros to Adrian', '4b670ea0-204c-465f-9154-f41f2bafe5c1', 'NEUTER', 'ACTIVE', 'BORROW');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(5.96, 1, 0.00, '2024-04-18 04:24:35.104', '2024-04-17 22:34:37.979', NULL, 6, 38, 7, '2024-04-18 04:24:35.104', NULL, 1, 'TRANSFER from Ahorros to BBVA', 'c2d73994-01ea-4e0e-92d1-6c97cc515216', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(1400.00, 1, 0.00, '2024-04-18 04:24:56.888', '2024-04-17 22:34:37.979', NULL, 25, 39, 6, '2024-04-18 04:24:56.888', NULL, 1, 'TRANSFER from BBVA to Efectivo', '9e2db99e-11e9-4d27-a39d-57b3d6eb7b07', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(600.00, 1, 0.00, '2024-04-18 04:25:15.794', '2024-04-17 22:34:37.979', NULL, 28, 40, 25, '2024-04-18 04:25:15.794', NULL, 1, 'Compras tianguis', 'ee6aa480-99a3-4121-a34a-a54903bec7fc', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(48.00, 1, 0.00, '2024-04-18 04:26:39.919', '2024-04-17 22:34:37.979', NULL, 41, 41, 25, '2024-04-18 04:26:39.919', NULL, 1, 'Viaje a oficinas CFE', 'be4966da-5b42-4552-a895-a2db748832e5', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(222.00, 1, 0.00, '2024-04-18 04:29:41.626', '2024-04-17 22:34:37.979', NULL, 47, 42, 25, '2024-04-18 04:29:41.626', NULL, 1, 'Gastos varios', 'a88e11a9-db79-4f8e-8c09-4cc65d16da3b', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(501.00, 1, 0.00, '2024-04-18 04:33:32.440', '2024-04-17 22:34:37.979', NULL, 40, 43, 6, '2024-04-18 04:33:32.440', NULL, 1, 'Juego de Herramientas de Reparación de Guitarra', '1b2ffbed-05e4-4ddc-8127-286bb5f4ed31', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(40.72, 1, 0.00, '2024-04-19 01:18:46.610', '2024-04-18 19:20:25.741', NULL, NULL, 44, 20, '2024-04-19 01:18:46.610', NULL, 1, 'DIVIDEND from Cajita', '4f95f024-06b4-4944-9e95-5b76055f61c9', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(410.00, 1, 0.00, '2024-04-21 19:04:29.365', '2024-04-21 13:16:59.160', NULL, 37, 45, 25, '2024-04-21 19:04:29.365', NULL, 1, 'EXPENSE from Efectivo to Comida rapida', '605247c9-a9eb-482c-afeb-b42c18f40c6f', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(122.26, 1, 0.00, '2024-04-21 19:04:54.902', '2024-04-21 13:16:59.160', NULL, NULL, 46, 20, '2024-04-21 19:04:54.902', NULL, 1, 'DIVIDEND from Cajita', 'ff7ab404-8a32-42da-b9fd-604f7501500b', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(1380.00, 1, 0.00, '2024-04-21 19:09:55.258', '2024-04-21 13:16:59.160', NULL, 6, 47, 20, '2024-04-21 19:09:55.258', NULL, 1, 'PROFIT from Cajita to BBVA', '1c8862a5-e91e-4873-8c37-5cc744260104', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(60.96, 1, 0.00, '2024-04-21 19:12:13.519', '2024-04-21 13:16:59.160', NULL, 7, 48, 6, '2024-04-21 19:12:13.519', NULL, 1, 'TRANSFER from BBVA to Ahorros', 'd2f19c5e-7971-40ac-9fd0-d692b3ce5907', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(1700.00, 1, 0.00, '2024-04-21 19:14:08.271', '2024-04-21 13:16:59.160', NULL, 25, 49, 6, '2024-04-21 19:14:08.271', NULL, 1, 'TRANSFER from BBVA to Efectivo', '3d605d2f-cf38-4a08-89a6-ae0f575310f0', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(2000.00, 1, 0.00, '2024-04-21 19:16:12.382', '2024-04-21 13:16:59.160', NULL, 28, 50, 25, '2024-04-21 19:16:12.382', NULL, 1, 'EXPENSE from Efectivo to Hogar', '961434ea-ace5-4a47-ae71-933db600ca11', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(40.22, 1, 0.00, '2024-04-22 23:41:51.671', '2024-04-22 17:42:45.466', NULL, NULL, 51, 20, '2024-04-22 23:41:51.671', NULL, 1, 'DIVIDEND from Cajita', '042d5fb2-6078-4278-9e70-b96e1ae86ecb', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(40.24, 1, 0.00, '2024-04-23 19:13:28.471', '2024-04-23 13:14:02.700', NULL, NULL, 52, 20, '2024-04-23 19:13:28.471', NULL, 1, 'DIVIDEND from Cajita', '1806330b-2be3-4680-af51-670367244283', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(707.78, 1, 7.28, '2024-04-23 19:47:22.161', '2024-04-23 13:49:19.766', NULL, 13, 53, 16, '2024-04-23 19:47:22.161', NULL, 1, 'Pago de Rendimientos', '8db236fc-1c96-4f92-ac45-edf3544e6c07', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(40.26, 1, 0.00, '2024-04-24 18:37:55.964', '2024-04-24 12:51:18.086', NULL, NULL, 54, 20, '2024-04-24 18:37:55.964', NULL, 1, 'DIVIDEND from Cajita', 'a0d37eca-bc4b-4941-9058-9fd9881c7fcc', 'ADDITION', 'ACTIVE', 'DIVIDEND');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(3100.00, 1, 0.00, '2024-04-24 18:38:44.664', '2024-04-24 12:51:18.086', NULL, 19, 55, 20, '2024-04-24 18:38:44.664', NULL, 1, 'PROFIT from Cajita to NU', '8a5e9187-c433-48d8-869f-9362edb47325', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(3100.00, 1, 0.00, '2024-04-24 18:48:32.844', '2024-04-24 12:51:18.086', NULL, 6, 56, 19, '2024-04-24 18:48:32.844', NULL, 1, 'PROFIT from NU to BBVA', '7c8fad95-646b-4a3b-8070-901742f59067', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(700.50, 1, 0.00, '2024-04-24 18:49:18.412', '2024-04-24 12:51:18.086', NULL, 6, 57, 13, '2024-04-24 18:49:18.412', NULL, 1, 'PROFIT from SuperTasas.com to BBVA', 'f95818b9-16e7-4b45-9e1c-6bf6629ce1b8', 'NEUTER', 'ACTIVE', 'PROFIT');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(700.50, 1, 0.00, '2024-04-24 18:49:41.625', '2024-04-24 12:51:18.086', NULL, 7, 58, 6, '2024-04-24 18:49:41.625', NULL, 1, 'TRANSFER from BBVA to Ahorros', '6dcc280b-a772-4173-99a1-e4fad9dd50ff', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(3100.00, 1, 0.00, '2024-04-24 17:30:12.000', '2024-04-25 17:40:24.290', NULL, 25, 59, 6, '2024-04-24 17:30:12.000', NULL, 1, 'TRANSFER from BBVA to Efectivo', '90929def-1a17-4f8f-b962-daf2fae5b6a2', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(690.00, 1, 0.00, '2024-04-24 18:31:47.000', '2024-04-25 17:40:24.290', NULL, 28, 60, 25, '2024-04-24 18:31:47.000', NULL, 1, 'Compras tianguis miercoles ocoyoacac', 'e916a757-8a66-487c-9934-95f6fe43be2c', 'SUBTRACTION', 'ACTIVE', 'EXPENSE');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(31602.80, 1, 0.00, '2024-04-25 23:34:41.547', '2024-04-25 17:40:24.290', NULL, 6, 61, 3, '2024-04-25 23:34:41.547', NULL, 1, 'Nomina', '4ab2fe3b-c852-46d9-ba0b-1eeb9f7fed37', 'ADDITION', 'ACTIVE', 'INCOME');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(7838.54, 1, 0.00, '2024-04-25 23:35:22.270', '2024-04-25 17:40:24.290', NULL, 7, 62, 6, '2024-04-25 23:35:22.270', NULL, 1, 'TRANSFER from BBVA to Ahorros', '5f47f236-eea0-4426-89d4-d29f0474d810', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(23764.26, 1, 0.00, '2024-04-25 23:37:40.311', '2024-04-25 17:40:24.290', NULL, 19, 63, 6, '2024-04-25 23:37:40.311', NULL, 1, 'TRANSFER from BBVA to NU', '1c6f1b72-aab2-433f-b28f-6f019a7c8476', 'NEUTER', 'ACTIVE', 'TRANSFER');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(23764.26, 1, 0.00, '2024-04-25 23:38:00.813', '2024-04-25 17:40:24.290', NULL, 20, 64, 19, '2024-04-25 23:38:00.813', NULL, 1, 'INVEST from NU to Cajita', 'b11796a5-f16a-4fbf-9b85-5c6f2951501d', 'NEUTER', 'ACTIVE', 'INVEST');
--INSERT INTO accountant.transactions
--(amount, applied, interest, applied_at, created_at, deleted_at, destination_id, id, origin_id, saved_at, updated_at, user_id, description, uuid, operation_type, status, `type`)
--VALUES(39.00, 1, 0.00, '2024-04-25 23:38:57.932', '2024-04-25 17:40:24.290', NULL, NULL, 65, 20, '2024-04-25 23:38:57.932', NULL, 1, 'DIVIDEND from Cajita', '8730e0bf-4ca1-4d54-af39-cc0b340db88c', 'ADDITION', 'ACTIVE', 'DIVIDEND');