/* 
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: DML SQL for Project Step 3
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325 as the skeleton code.
*/

-- get all information from Vendors
SELECT * FROM Vendors;

-- get all information from Products
SELECT * FROM Products;

-- get all information from Invoices
SELECT * FROM Invoices;

-- get all information from Invoice_Items
SELECT * FROM Invoice_Items;

-- get all information from customers
SELECT * FROM Customers;

-- get all sales
SELECT * FROM Sales;

-- get all menu itmes
SELECT * FROM Menu_Items;

--get all sales items
SELECT * FROM Sales_Items;

-- Insert into Vendors
INSERT INTO Vendors (name, phone, email)
VALUES (:nameInput, :phoneInput, :emailInput);

-- Insert into Products
INSERT INTO Products (vendorID, productPrice, productWeight, productDescription, productInStock, productName)
VALUES (:vendorIDInput, :productPriceInput, :productWeightInput, :productDescriptionInput, :productInStockInput, :productNameInput);

-- Insert into Invoices
INSERT INTO Invoices (vendorID, invoiceDate)
VALUES (:vendorIDInput, :invoiceDateInput);

-- Insert into Invoice_Items
INSERT INTO Invoice_Items (invoiceID, productID, orderQuantity, unitPrice)
VALUES (:invoiceIDInput, :productIDInput, :orderQuantityInput, :unitPriceInput);

-- Insert into customers/ new customer
INSERT INTO Customers (name, email)
VALUES (:nameInput, :emailInput);

-- Insert into sales
INSERT INTO Sales (customerID, date)
VALUES (:customerIDInput, :dateInput);

-- Insert into Menu itmes
INSERT INTO Menu_Items (name, listedPrice, menuItmeQuanity)
VALUES (:nameInput, :listedPriceInput, :menuItmeQuanityInput);


-- Insert into Sales Items
INSERT INTO Sales_Items (menuItemID, orderQuanity, unitPrice)
VALUES (:nameInput, :emailInput);

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