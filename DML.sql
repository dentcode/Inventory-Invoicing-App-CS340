/* 
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: DML SQL for Project Step 3
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325 as the skeleton code.
*/

----------------------
--Vendors
----------------------

-- get all information from Vendors
SELECT * FROM Vendors;

-- Insert into Vendors
INSERT INTO Vendors (name, phone, email)
VALUES (:nameInput, :phoneInput, :emailInput);

---------------------
--Products
---------------------

-- get all information from Products
SELECT Products.productID, Vendors.name AS vendor, Products.productPrice, Products.productWeight, Products.productDescription, Products.productInStock, Products.productName
FROM Products
INNER JOIN Vendors
ON Products.vendorID = Vendors.vendorID;

-- Insert into Products
INSERT INTO Products (vendorID, productPrice, productWeight, productDescription, productInStock, productName)
VALUES (:vendorIDInput, :productPriceInput, :productWeightInput, :productDescriptionInput, :productInStockInput, :productNameInput);
---------------------
--Invoices
---------------------

-- get all information from Invoices
SELECT Invoices.invoiceID, Vendors.name AS vendor, Invoices.InvoiceDate
FROM Invoices
INNER JOIN Vendors
ON Invoices.vendorID = Vendors.vendorID;

-- Insert into Invoices
INSERT INTO Invoices (vendorID, invoiceDate)
VALUES (:vendorIDInput, :invoiceDateInput);

--------------------
--Invoice_Items
--------------------

-- get all information from Invoice_Items
SELECT Invoice_Items.invoiceItemsID, Invoice_Items.invoiceID, Products.productNAME AS product, Invoice_Items.orderQuantity, Invoice_Items.unitPrice
FROM Invoice_Items
INNER JOIN Products
ON Invoice_Items.productID = Products.productID;

-- Insert into Invoice_Items
INSERT INTO Invoice_Items (invoiceID, productID, orderQuantity, unitPrice)
VALUES (:invoiceIDInput, :productIDInput, :orderQuantityInput, :unitPriceInput);


---------------------
--Customers
---------------------

-- get all information from customers
SELECT * FROM Customers;

-- Insert into customers/ new customer
INSERT INTO Customers (name, email)
VALUES (:nameInput, :emailInput);

---------------------
--Sales
---------------------

-- get all sales
SELECT * FROM Sales;

-- Insert into sales
INSERT INTO Sales (customerID, date)
VALUES (:customerIDInput, :dateInput);

---------------------
--Menu_Items
---------------------

-- get all menu itmes
SELECT * FROM Menu_Items;

-- Insert into Menu items
INSERT INTO Menu_Items (name, listedPrice, menuItmeQuanity)
VALUES (:nameInput, :listedPriceInput, :menuItmeQuanityInput);

-- look for menu item ID by name
SELECT menuItemID FROM Menu_Items
WHERE name = :nameInput

--get IDs and names to populate dropdown
SELECT menuItemID, name, FROM Menu_Items

-- Update price and quanity in menu Items by name dropdown
UPDATE Menu_Items 
SET listedPrice = :listedPriceInput, menuItmeQuanity = :menuItmeQuanityInput
WHERE name = :name_menu_item_from_dropdown_input

-- Delete Menu Item by ID
DELETE FROM Menu_Items
WHERE menuItemID = :menuItemIDInput

---------------------
--Sales_Iems
---------------------

--get all sales items
SELECT * FROM Sales_Items;

-- Insert into Sales Items
INSERT INTO Sales_Items (menuItemID, orderQuanity, unitPrice)
VALUES (:nameInput, :emailInput);

