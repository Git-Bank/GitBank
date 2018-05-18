--Drops the gitbank_db if it exists currently --
DROP DATABASE IF EXISTS gitbank_db;
-- Creates the gitbank_db database --
CREATE DATABASE gitbank_db;

--Make it so all of the following code will affect animals_db
USE gitbank_db;

--Creates the table "users" within gitbank_db (make sure you map table inputs to form)--
CREATE TABLE users (
    Unique_id INTEGER(11) Auto_Increment NOT NULL,
    Full_Name VARCHAR(30) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL,
    PRIMARY KEY (Unique_id)
);

--Creates the table of Expenses within gitbank_db (make sure you map table inputs to form)--
CREATE TABLE expenses (
    Unique_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    id INTEGER(11) NOT NULL,
    Expense_Name VARCHAR(30) NOT NULL, 
    Expense_Value INTEGER(11),
    Expense_Frequency VARCHAR(30) NOT NULL,
    Expense_Paydate INTEGER(2),
    PRIMARY KEY (Unique_id)

);

--Creates the table of Income within gitbank_db (Make sure you map table inputs to form)
CREATE TABLE income (
    Unique_id Integer(11) AUTO_INCREMENT NOT NULL,
    id INTEGER(11) NOT NULL,
    Biweekly_Income INTEGER(11),
    Income_Paydate INTEGER(2),
    PRIMARY KEY (Unique_id)
);

--Creates the table of Cash Balance within gitbank_db (Make sure you map table inputs to form)
CREATE TABLE balance (
    Unique_id Integer(11) AUTO_INCREMENT NOT NULL,
    id INTEGER(11) NOT NULL,
    Beg_Balance INTEGER(11),
    Ending_Balance INTEGER(2),
    PRIMARY KEY (Unique_id)
);

SELECT * FROM users;
SELECT * FROM expenses;
SELECT * FROM income;
SELECT * FROM balance;