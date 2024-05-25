# Accountant CONFIG

SpringBoot
```bash
gradlew build -x test
```

Angular
```bash
npm run build
```


```bash
docker-compose down && docker-compose build && docker-compose up
```


```sql
create database accountant_local;
CREATE USER 'accountant_web'@localhost IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON accountant_local.* TO 'accountant_web'@localhost;
FLUSH PRIVILEGES;

-- CREATE TABLE accountant_local.currencies SELECT * FROM accountant_test.currencies;
-- CREATE TABLE accountant_local.users SELECT * FROM accountant_test.users;
-- CREATE TABLE accountant_local.accounts SELECT * FROM accountant_test.accounts;
-- CREATE TABLE accountant_local.schedule_transactions SELECT * FROM accountant_test.schedule_transactions;
-- CREATE TABLE accountant_local.transactions SELECT * FROM accountant_test.transactions;
```
