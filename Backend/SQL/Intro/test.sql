--NOTE: C -> Create
--NOTE: R -> Read
--NOTE: U -> Update
--NOTE: D -> Destroy


--NOTE: This is how we create and define our new table
CREATE TABLE products(
  id INT NOT NULL,
  name STRING,
  price MONEY,
  PRIMARY KEY(id)
)
--NOTE: This allows us to add a new item or "Product" into our Newely defined table
INSERT INTO products
VALUES (1, 'pen', 1.20)

--NOTE: But say we want to add a new product but don't have a price for it yet.
--NOTE: We can Define it like so -> We specify the columns we have data for
INSERT INTO products (id, name)
VALUES (2, 'pencil')

--NOTE: Reading The Data
--NOTE: This will select everything from our table
SELECT * FROM products;

--NOTE: We can select certain columns like so -> Returns all items in those columns
SELECT name, price FROM products;

--NOTE: We can select specific rows aswell
--NOTE: This will search everything from our table and try to find us the row with an id of 1
SELECT * FROM products WHERE id=1

--NOTE: This will search everything in the name column
SELECT name FROM products WHERE id=1


--NOTE: UPDATING VALUES IN A TABLE

--NOTE: If we don't specify a where condition this will update all The
-- prices in the table with the value of 0.80
UPDATE products
SET price = 0.80
where id=2

--NOTE: ALTERING DATA IN TABLES
--ALTER TABLE is used to add, delte, or modify columns in an exisitng tbale
--Adding a new column
ALTER TABLE products
ADD stock INT

--NOTE: DELETING DATA IN TABLES
--DELETE statement is used to delete exisitng record in a table
DELETE FROM products
WHERE name='Pencil'
--WHERE id=2 -- We can use either depending on the sotuatiom needed



--NOTE: FOREIGN KEYS, RELATIONSHIPS AND INNER JOINS

CREATE TABLE customers (
  order_number INT NOT NULL,
  first_name STRING,
  last_name STRING,
  address STRING
)

--NOTE: I Made a mistake and order_number should have been id
-- So the following command below alters the table and changws the column name
ALTER TABLE customers RENAME COLUMN order_number TO id

--NOTE: Adding a new customer into our table
INSERT INTO customers
VALUES (1, 'Marta', 'Metz', 'Wojska Polskiego')

--NOTE: Adding a new customer into our table
INSERT INTO customers
VALUES (2, 'Oliver', 'Metz', 'Wojska Polskiego')


CREATE TABLE orders (
  id INT NOT NULL,
  order_number INT,
  --NOTE: This will be a foreging key and will point to a record in our customers product id
  customer_id INT,
  product_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(customer_id) REFERENCES customers(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
)


--NOTE: Making a new record in our orders table
-- which will be used to link up our Foreign Relationships on the different tables
INSERT INTO orders
--NOTE: id=1 order_number=4362 customer_id=2 product_id=1
VALUES (1, 4362, 2, 1)

--NOTE: SQL INNER JOIN
--NOW WE CAN JOIN OUR TABLES
SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
