DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20),
  department_name VARCHAR(20),
  price DECIMAL (10,4),
  stock_quantity INTEGER(11),
  PRIMARY KEY(item_id)
);


SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", "food", 0.25, 3000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "sports", 590.75, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headphones", "electronics", 40.00, 302);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vitamins", "health", 9.99, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pencils", "office", 0.10, 42000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fax machine", "office", 1.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "electronics", 10.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pillow", "home", 50.00, 8764);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gum", "food", 0.25, 53050);



-- DELETE FROM products
-- WHERE item_id = 11;
-- DELETE FROM products
-- WHERE item_id = 12;
-- DELETE FROM products
-- WHERE item_id = 13;
-- DELETE FROM products
-- WHERE item_id = 14;
-- DELETE FROM products
-- WHERE item_id = 15;
-- DELETE FROM products
-- WHERE item_id = 16;
-- DELETE FROM products
-- WHERE item_id = 17;
-- DELETE FROM products
-- WHERE item_id = 18;
