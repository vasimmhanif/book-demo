CREATE DATABASE learning_nodejs;

USE learning_nodejs;

CREATE TABLE books (
    id              int(11) not null auto_increment,
    isbn            varchar(255),
    title           varchar(255),
    author          varchar(255),
    publisher       varchar(255),
    published_date  date,
    constraint pk_book primary key     (id,isbn)
);