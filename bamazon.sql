DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name  VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price  INT default 0,
  stock_quantity  INT default 10
);

INSERT INTO products(product_name, department_name, price, stock_quantity);
VALUES 
("Scarves","Clothing",15,20),
("Mittens","Clothing",10,20),
("Headphones","Electronics",20,20),
("Snow boots","Clothing",10,20),
("Wool Socks","Clothing",5,20),
("Winter Jacket","Clothing",40,20),
("Snow Pants","Clothing",30,20),
("Xbox Controller","Electronics",10,20),
("Frying pan","Miscellaneous",10,20),
("Grapes","Food",5,20);



