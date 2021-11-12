DROP DATABASE IF EXISTS organizer;

CREATE DATABASE organizer;
USE organizer;
--DROP TABLE IF EXISTS Employee;
--DROP TABLE IF EXISTS Roles;
--DROP TABLE IF EXISTS Department;
CREATE TABLE Department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    Department_name VARCHAR(30) NOT NULL
);

CREATE TABLE Roles (
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL(20, 2) NOT NULL,
   Department_id INTEGER,
   CONSTRAINT fk_Department FOREIGN KEY (Department_id) REFERENCES Department(id) ON DELETE SET NULL
);

CREATE TABLE Employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department VARCHAR(20) REFERENCES Department(Department_name),
    salary DECIMAL(20, 2) REFERENCES Roles(salary),
    role_id INTEGER,
    manager_id INTEGER REFERENCES Employee(id),
    CONSTRAINT fk_Role FOREIGN KEY (Role_id) REFERENCES Roles(id) 
);




