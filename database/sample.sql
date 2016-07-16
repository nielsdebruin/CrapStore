-- -----------------------------------------------------
-- > SQL script generating sample data for the database
--
-- Run this script after having run the schema.sql
-- script, in order to populate the database with sample
-- data. If you want to run this script again, run
-- schema.sql first, so that you get a clean DB install
-- and prevent duplicates from being inserted.
-- -----------------------------------------------------

-- -----------------------------------------------------
-- The DB user used for interaction with the DB
-- -----------------------------------------------------
GRANT ALL PRIVILEGES ON `CrapStore` . * TO 'web'@'localhost' IDENTIFIED BY 'pass' WITH GRANT OPTION;

-- -----------------------------------------------------
-- Sample CrapStore Users
-- -----------------------------------------------------
INSERT INTO CrapStore.User (name, password, email, isAdmin, isSupplier, hint) VALUES
('Niels de Bruin', '123', 'nielsdebruin@gmail.com', 1, 0, 'blue'),
('Georgios Andreadis', '456', '123@123.nl', 1, 0, 'blue'),
('S. A.', '789', 'abc@abc.nl', 0, 0, 'red'),
('Cool Products', '1234', 'info@coolproductssupplier.me', 0, 1, 'pink');

-- -----------------------------------------------------
-- Sample products
-- -----------------------------------------------------
INSERT INTO `CrapStore`.`Product` (name, qty, description, price, hidden, idSupplier) VALUES
("Ipad 9 with 5G", 5, "This is the best iPad yet. It is thinner, faster, and lighter than a PowerPC", "42.42", 0, 4),
("Iphone 9", 5, "This is the best iPhone yet. It is thinner, faster, lighter than a brick!", "42.42", 0, 4),
("Diamonds", 5, "They're real diamonds for sure. No refunds.", "24.42", 0, 4),
("Guide to become rich!", 5, "Ever wondered how people get rich? In this book the secret will be revealed!", "42.42", 1, 4),
("MacBook Pro", 5, "Comes with box and charger. No take backs", "142.42", 0, 4),
("100 Dollar Bills", 5, "Wanna be rich, buy the best quality money here!", "129.95", 1, 4);

-- -----------------------------------------------------
-- Sample guest book entries
-- -----------------------------------------------------
INSERT INTO `CrapStore`.`GuestBookEntry` (name, email, message) VALUES
('G. A.', '123@123.nl', 'Great products! Nice electronics you have here. Will shop here again!'),
('S. A.', 'abc@abc.nl', 'Fantastic customer service! The best on the whole world wide web.'),
('Cool Products Supplier', 'info@coolproductssupplier.me', 'Great company to work with as a supplier! ');

-- -----------------------------------------------------
-- Sample orders
-- -----------------------------------------------------
INSERT INTO `CrapStore`.`Order` (User_id) VALUES
(1),
(1),
(1);

-- -----------------------------------------------------
-- Sample orders
-- -----------------------------------------------------
INSERT INTO `CrapStore`.`OrderItem` (idOrder, idProduct) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 2);