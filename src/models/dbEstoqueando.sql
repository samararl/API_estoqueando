
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
	active INT NOT NULL DEFAULT 1,
	flag_consultant INT,
	flag_premium INT DEFAULT 0,
	flag_user_admin INT NOT NULL DEFAULT 0,
	genre VARCHAR(1),
	cep VARCHAR(9),
	uf VARCHAR(2), 
	phone VARCHAR(12),
	avarege_evaluation DECIMAL, 
	photo varchar(255),
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
	photo varchar(255),	
	FOREIGN KEY (id_brand) REFERENCES BRAND (id_brand)
);  

DROP TABLE IF EXISTS PRODUCT;
CREATE TABLE PRODUCT (
	id_product SERIAL PRIMARY KEY,
	title VARCHAR (50),
	description VARCHAR (255),
	photo VARCHAR(255),
	catalogue_product_price DECIMAL,
	cod_ref VARCHAR(45),
	active INT DEFAULT 1
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

DROP TABLE IF EXISTS PURCHASE_ORDER;
CREATE TABLE PURCHASE_ORDER (
	id_purchase_order SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	order_date DATE,
	total_price DECIMAL DEFAULT 0,
	sales_date DATE, 
	status CHAR CHECK (status = 'A' or 'F'),
	obs VARCHAR (100),
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person)
);

DROP TABLE IF EXISTS PRODUCT_PURCHASE_ORDER;
CREATE TABLE PRODUCT_PURCHASE_ORDER (
	id_purchase_order INT NOT NULL,
	id_product INT NOT NULL,
	qtd_product INT,
	FOREIGN KEY (id_purchase_order) REFERENCES PURCHASE_ORDER (id_purchase_order),
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product)
);  


DROP TABLE IF EXISTS EVALUATION;
CREATE TABLE EVALUATION (
	id_evaluation SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	evaluation INT,
	comments VARCHAR(255),
	date_ref DATE,
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person)
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

DROP TABLE IF EXISTS MESSAGE;
CREATE TABLE MESSAGE(
id_message SERIAL PRIMARY KEY, 
id_conversa INT NOT NULL,
id_person_from INT NOT NULL,
id_person_to INT NOT NULL,
msg_date_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
date_remove TIMESTAMP,
message VARCHAR(255) NOT NULL,
FOREIGN KEY (id_person_from) REFERENCES PERSON (id_person),
FOREIGN KEY (id_person_to) REFERENCES PERSON (id_person)
);


-- inserindo usuário de teste
INSERT INTO PERSON (name, cpf , email, password ) VALUES ('Teste', '06723378008', 'teste@teste.com', '"$2b$10$kS1vRy4zHHMDumpPyCseXum2.ZZ/tpvkro.HXfX1kFUwXkyIkQ/0."')

