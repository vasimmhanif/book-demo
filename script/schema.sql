CREATE DATABASE learning_nodejs;

USE learning_nodejs;

CREATE TABLE books (
	isbn varchar(255),
    title varchar(255),
    author varchar(255),
    publisher varchar(255),
    published_date date,
    primary key (isbn)
);