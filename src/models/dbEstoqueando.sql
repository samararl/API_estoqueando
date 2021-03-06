﻿
DROP DATABASE dbEstoqueando;
CREATE DATABASE dbEstoqueando;
USE dbEstoqueando;

DROP TABLE IF EXISTS BRAND;
CREATE TABLE BRAND (
	id_brand SERIAL PRIMARY KEY,
	name VARCHAR (45) NOT NULL
);

DROP TABLE IF EXISTS SEGMENT;
CREATE TABLE SEGMENT (
	id_segment SERIAL PRIMARY KEY, 
	name VARCHAR(45)
);

DROP TABLE IF EXISTS CATALOGUE;
CREATE TABLE CATALOGUE (
	id_catalogue SERIAL PRIMARY KEY,
	id_brand INT NOT NULL,
	id_segment INT NOT NULL,
	year INT,
	description VARCHAR(255),
	image varchar(255),	
	FOREIGN KEY (id_brand) REFERENCES BRAND (id_brand),
	FOREIGN KEY (id_segment) REFERENCES SEGMENT (id_segment)
);  

DROP TABLE IF EXISTS PRODUCT;
CREATE TABLE PRODUCT (
	id_product SERIAL PRIMARY KEY,
	title VARCHAR (50) NOT NULL,
	description VARCHAR (255),
	image VARCHAR(255),
	cod VARCHAR(45),
	dt_include TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	dt_removal TIMESTAMP WITH TIME ZONE
);

DROP TABLE IF EXISTS PRODUCT_CATALOGUE;
CREATE TABLE PRODUCT_CATALOGUE (
	id_catalogue INT NOT NULL,
	id_product INT NOT NULL,
	catalogue_product_price DECIMAL NOT NULL,
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product),
	FOREIGN KEY (id_catalogue) REFERENCES CATALOGUE (id_catalogue)
);  

DROP TABLE IF EXISTS PERSON;
CREATE TABLE PERSON (
	id_person SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	document VARCHAR(14) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(250) NOT NULL,
	flag_admin CHAR(1) DEFAULT 'N',
	photo varchar(255),	
	genre CHAR(1),
	phone VARCHAR(12),
	zip_code CHAR(9),
	state CHAR(2), 
	city VARCHAR(50),
	address VARCHAR(150),
	number VARCHAR(10),
	dt_include TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	dt_edit TIMESTAMP WITH TIME ZONE,
	dt_removal TIMESTAMP WITH TIME ZONE,
	UNIQUE(email),
	UNIQUE (document),
	CONSTRAINT flag_admin_check CHECK (flag_admin in ('S', 'N')),
	CONSTRAINT genre_check CHECK (genre in ('F', 'M'))
);


DROP TABLE IF EXISTS PERSON_PRODUCT;
CREATE TABLE PERSON_PRODUCT (
	id_person_product SERIAL PRIMARY KEY,
	id_person INT NOT NULL,
	id_product INT NOT NULL,
	qtd_stock INT NOT NULL,
	status CHAR(1) NOT NULL,		
	consultant_price DECIMAL,
	id_person_product_sale INT,
	dt_status TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_person) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_product) REFERENCES PRODUCT (id_product),
	FOREIGN KEY (id_person_product_sale) REFERENCES PERSON_PRODUCT (id_person_product),
	CONSTRAINT status CHECK (status in ('E', 'S'))
);

DROP TABLE IF EXISTS PURCHASE_ORDER;
CREATE TABLE PURCHASE_ORDER (
	id_purchase_order SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	status CHAR(1),	
	total_price DECIMAL DEFAULT 0,
	dt_sale DATE, 
	dt_order DATE DEFAULT CURRENT_DATE,
	obs VARCHAR (100),
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person),
	CONSTRAINT status CHECK (status in ('A', 'F'))
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
CREATE TABLE EVALUATION(
	id_evaluation SERIAL PRIMARY KEY,
	id_consultant INT NOT NULL,
	id_client INT NOT NULL,
	evaluation INT,
	comment VARCHAR(255),
	dt_evaluation DATE DEFAULT CURRENT_DATE,
	FOREIGN KEY (id_consultant) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_client) REFERENCES PERSON (id_person)
); 


DROP TABLE IF EXISTS REMINDER;
CREATE TABLE REMINDER(
	id_reminder SERIAL PRIMARY KEY,
	id_purchase_order INT NOT NULL,
	reminder_text VARCHAR(255),
	dt_ref DATE,
	dt_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_purchase_order) REFERENCES PURCHASE_ORDER (id_purchase_order)
); 

DROP TABLE IF EXISTS MESSAGE;
CREATE TABLE MESSAGE(
	id_message SERIAL PRIMARY KEY, 
	id_conversation INT NOT NULL,
	id_person_from INT NOT NULL,
	id_person_to INT NOT NULL,
	message VARCHAR(255) NOT NULL,
	dt_msg TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	dt_removal TIMESTAMP,
	FOREIGN KEY (id_person_from) REFERENCES PERSON (id_person),
	FOREIGN KEY (id_person_to) REFERENCES PERSON (id_person)
);


-- ALTERAÇÕES

DELETE FROM PRODUCT_CATALOGUE;
ALTER TABLE PRODUCT_CATALOGUE ADD COLUMN ID_PRODUCT_CATALOGUE SERIAL PRIMARY KEY;


DELETE FROM PERSON_PRODUCT;
ALTER TABLE PERSON_PRODUCT DROP COLUMN ID_PRODUCT;
ALTER TABLE PERSON_PRODUCT ADD COLUMN ID_PRODUCT_CATALOGUE INT NOT NULL;
ALTER TABLE PERSON_PRODUCT ADD CONSTRAINT PERSON_PRODUCT_FK_PRODUCT_CATALOGUE FOREIGN KEY (ID_PRODUCT_CATALOGUE) REFERENCES PRODUCT_CATALOGUE(ID_PRODUCT_CATALOGUE);

ALTER TABLE CATALOGUE DROP COLUMN year;
ALTER TABLE CATALOGUE ADD COLUMN DATE DATE;

DELETE FROM PERSON_PRODUCT;
ALTER TABLE PERSON_PRODUCT DROP COLUMN ID_PRODUCT_CATALOGUE;
ALTER TABLE PERSON_PRODUCT DROP COLUMN STATUS;
ALTER TABLE PERSON_PRODUCT DROP COLUMN CONSULTANT_PRICE;
ALTER TABLE PERSON_PRODUCT DROP COLUMN ID_PERSON_PRODUCT_SALE;
ALTER TABLE PERSON_PRODUCT DROP COLUMN DT_STATUS;
ALTER TABLE PERSON_PRODUCT ADD COLUMN ID_PRODUCT INT NOT NULL;
ALTER TABLE PERSON_PRODUCT ADD CONSTRAINT PERSON_PRODUCT_FK_PRODUCT FOREIGN KEY (ID_PRODUCT) REFERENCES PRODUCT(ID_PRODUCT);


CREATE TABLE MOVIMENT(
  ID_MOVIMENT SERIAL PRIMARY KEY,
  ID_PERSON_PRODUCT INT NOT NULL,
  DT_MOVIMENT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  TYPE CHAR(1) NOT NULL,
  QTD INT NOT NULL,
  FOREIGN KEY (ID_PERSON_PRODUCT) REFERENCES PERSON_PRODUCT (ID_PERSON_PRODUCT),
  CONSTRAINT TYPE CHECK (TYPE in ('I', 'O'))
);
 COMMENT ON COLUMN MOVIMENT.TYPE IS 'I - IN ; O - OUT';

 CREATE TABLE PRICE (
 ID_PRICE SERIAL PRIMARY KEY,
 ID_MOVIMENT INT NOT NULL,
 PRICE DECIMAL,
 DT_CREATION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 DT_END TIMESTAMP ,
 FOREIGN KEY (ID_MOVIMENT) REFERENCES MOVIMENT (ID_MOVIMENT)
 );


DELETE FROM PURCHASE_ORDER;
ALTER TABLE PRODUCT_PURCHASE_ORDER ADD COLUMN PRICE_PRODUCT DECIMAL NOT NULL;

ALTER TABLE PRODUCT_PURCHASE_ORDER DROP COLUMN ID_PRODUCT;
ALTER TABLE PRODUCT_PURCHASE_ORDER ADD COLUMN ID_PRODUCT_CATALOGUE INT NOT NULL;
ALTER TABLE PRODUCT_PURCHASE_ORDER ADD CONSTRAINT PRODUCT_PURCHASE_ORDER_FK_PRODUCT_CATALOGUE FOREIGN KEY (ID_PRODUCT_CATALOGUE) REFERENCES PRODUCT_CATALOGUE(ID_PRODUCT_CATALOGUE);

AlTER TABLE PRODUCT ADD CONSTRAINT COD_PRODUCT_UNIQUE UNIQUE (COD);

-- inserindo usuário de teste
INSERT INTO PERSON (name, document , email, password ) VALUES ('Teste', '06723378008', 'teste@teste.com', '$2b$10$kS1vRy4zHHMDumpPyCseXum2.ZZ/tpvkro.HXfX1kFUwXkyIkQ/0.')

