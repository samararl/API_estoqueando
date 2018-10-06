DROP DATABASE dbEstoqueando;
CREATE DATABASE dbEstoqueando;
USE dbEstoqueando;


DROP TABLE IF EXISTS BRAND;
CREATE TABLE BRAND (
	id_brand SERIAL PRIMARY KEY,
	name VARCHAR (45) NOT NULL,
	segment VARCHAR (60) NOT NULL,
	periodicity VARCHAR (20) NOT NULL,
	description VARCHAR (255) NOT NULL
);


DROP TABLE IF EXISTS PERSON;
CREATE TABLE PERSON (
	id_person SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	active INT NOT NULL,
	flag_consultant INT,
	flag_premium INT,
	genre VARCHAR(1),
	cep VARCHAR(9),
	uf VARCHAR(2), 
	phone VARCHAR(12),
	avarege_evaluation DECIMAL, 
	photo OID,
	UNIQUE(email),
	UNIQUE (cpf)
);

DROP TABLE IF EXISTS CATALOGUE;
CREATE TABLE CATALOGUE (
	id_catalogue SERIAL PRIMARY KEY,
	id_brand INT NOT NULL,
	period_ref INT NOT NULL,
	year_ref INT,
	description_ref VARCHAR(255),
	photo OID,	
	FOREIGN KEY (id_brand) REFERENCES BRAND (id_brand)
);  

DROP TABLE IF EXISTS PRODUCT;
CREATE TABLE PRODUCT (
	id_product SERIAL PRIMARY KEY,
	title VARCHAR (50),
	description VARCHAR (255),
	photo OID,
	cod_ref VARCHAR(45)
);


DROP TABLE IF EXISTS PERSON_PRODUCT;
CREATE TABLE PERSON_PRODUCT (
	id_person INT NOT NULL,
	id_product INT NOT NULL,
	stock_product INT NOT NULL,
	consultant_product_price DECIMAL,
	FOREIGN KEY (id_person) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product)
);

DROP TABLE IF EXISTS EXPENSES;
CREATE TABLE EXPENSES (
	id_expenses SERIAL PRIMARY KEY,
	id_person INT NOT NULL,
	title VARCHAR (45) NOT NULL,
	date_ref DATE,
	total DECIMAL,
	description VARCHAR (255), 
	FOREIGN KEY (id_person) REFERENCES PERSON (id_person)
);  

DROP TABLE IF EXISTS PURCHASEORDER;
CREATE TABLE PURCHASEORDER (
	id_purchaseorder SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	id_client INT NOT NULL,
	order_date DATE,
	total_price DECIMAL,
	sales_date DATE, 
	status VARCHAR (20),
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_client) REFERENCES PERSON (id_person)
);

DROP TABLE IF EXISTS PRODUCT_PURCHASEORDER;
CREATE TABLE PRODUCT_PURCHASEORDER (
	id_purchaseorder INT NOT NULL,
	id_product INT NOT NULL,
	qtd_product INT,
	FOREIGN KEY (id_purchaseorder) REFERENCES PURCHASEORDER (id_purchaseorder),
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product)
);  


DROP TABLE IF EXISTS EVALUATION;
CREATE TABLE EVALUATION (
	id_evaluation SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	id_purchaseorder INT NOT NULL,
	evaluation INT,
	comments VARCHAR(255),
	date_ref DATE,
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_purchaseorder) REFERENCES PURCHASEORDER (id_purchaseorder)
); 


DROP TABLE IF EXISTS PRODUCT_CATALOGUE;
CREATE TABLE PRODUCT_CATALOGUE (
	id_catalogue INT NOT NULL,
	id_product INT NOT NULL,
	catalogue_product_price DECIMAL NOT NULL,
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product),
	FOREIGN KEY (id_catalogue) REFERENCES CATALOGUE (id_catalogue)
);  

DROP TABLE IF EXISTS REMINDER;
CREATE TABLE REMINDER(
	id_reminder SERIAL PRIMARY KEY,
	id_person INT NOT NULL,
	reminder_text VARCHAR(255),
	date_ref DATE,
	creation_date DATE,
	flag_check INT,
	FOREIGN KEY (id_person) REFERENCES PERSON (id_person)
); 

DROP TABLE IF EXISTS USERADMIN;
CREATE TABLE USERADMIN(
id_useradmin SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
login VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL,
permision INT NOT NULL,
active INT NOT NULL,
UNIQUE(login)
);


DROP TABLE IF EXISTS STOCK;
CREATE TABLE STOCK(
id_stock SERIAL PRIMARY KEY,
id_consultant INT NOT NULL,
FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person)
);

DROP TABLE IF EXISTS STOCK_PRODUCT;
CREATE TABLE STOCK_PRODUCT(
id_stock INT NOT NULL,
id_product INT NOT NULL,
qtd_product INT NOT NULL,
FOREIGN KEY (id_stock) REFERENCES STOCK (id_stock),
FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product)
);










