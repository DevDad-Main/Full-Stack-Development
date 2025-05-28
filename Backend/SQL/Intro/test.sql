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
VALUES (2, 'string')

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

