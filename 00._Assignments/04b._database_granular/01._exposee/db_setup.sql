-- Create the database
CREATE DATABASE employee_db;

-- Connect to the database
\c employee_db

-- Create tables
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    salary DECIMAL(10,2),
    department VARCHAR(50),
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    budget DECIMAL(12,2)
);