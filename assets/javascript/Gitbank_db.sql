--Drops the gitbank_db if it exists currently --
DROP DATABASE IF EXISTS gitbank_db;
-- Creates the gitbank_db database --
CREATE DATABASE gitbank_db;

--Make it so all of the following code will affect gitbank_db--
USE gitbank_db;

--Creates the table "users" within gitbank_db (make sure you map table inputs to form)--
CREATE TABLE users (
    Unique_id INTEGER(11) NOT NULL,
    Full_Name VARCHAR(30)  NOT NULL,
    Email VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL
);

-- Creates the table of Expenses within gitbank_db (make sure you map table inputs to form) --
CREATE TABLE expenses (
    Unique_id INTEGER(11) NOT NULL,
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    Expense_Name VARCHAR(30) NOT NULL, 
    Expense_Value INTEGER(11),
    Expense_Frequency VARCHAR(30) NOT NULL,
    Expense_Paydate INTEGER(2),
    PRIMARY KEY (id)
);

-- Creates the table of Income within gitbank_db (Make sure you map table inputs to form) --
CREATE TABLE income (
    Unique_id Integer(11) NOT NULL,
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    income_Value INTEGER(11),
    income_Frequency VARCHAR(30) NOT NULL,
    Income_Paydate INTEGER(2),
    PRIMARY KEY (id)
);

--Creates the table of Cash Balance within gitbank_db (Make sure you map table inputs to form)
CREATE TABLE balance (
    Unique_id Integer(11) NOT NULL,
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    Beg_Balance INTEGER(11),
    Ending_Balance INTEGER(2),
    PRIMARY KEY (id)
);

--------------------------------------------Create Dummy inputs to test code--------------------------------------------------------
INSERT INTO users (Unique_id, Full_Name, Email, Password)
VALUES (1,"Grandpa Gametight","grandpaSwag@gmail.com", "oldMoney72");

INSERT INTO expenses (Unique_id, Expense_Name, Expense_Value, Expense_Frequency, Expense_Paydate)
VALUES (1, "Car Note", 500, "Monthly", 10),
(1, "Car Insurance", 100, "Monthly", 5),
(1, "Rent", 500, "Monthly",1),
(1, "Fun", 120, "Weekly",4),
(1, "Auto Expenses", 60, "Weekly",19),
(1, "Food", 150, "biweekly",18);

INSERT INTO income (Unique_id, income_Value, income_Frequency, Income_Paydate)
VALUES (1, 2000,"biweekly", 25);

INSERT INTO balance (Unique_id, Beg_Balance)
VALUES (1, 10000);

SELECT * FROM users;
SELECT * FROM expenses;
SELECT * FROM income;
SELECT * FROM balance;