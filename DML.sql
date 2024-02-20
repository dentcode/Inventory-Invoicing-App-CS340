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

------ SELECT (READ)------

-- get all vendors information
SELECT Vendors.vendorID, Vendors.name, Vendors.phone, Vendors.email FROM Vendors;


-------INSERT (CREATE)------

-- add a new vendor
INSERT INTO Vendors (name, phone, email)
VALUES (:nameInput, :phoneInput, :emailInput);


------DELETE------

-- remove a vendor
DELETE FROM Vendors WHERE Vendors.vendorID = :vendor_ID_selected_from_vendor_page;

------UPDATE------

-- update a vendor's data based on submission of the update vendor form
SELECT vendorID, name, phone, email
    FROM Vendors
    WHERE vendorID = :vendor_ID_selected_from_vendor_page;

UPDATE Vendors
    SET name = :nameInput, phone = :phoneInput, email = :emailInput
    WHERE vendorID = :vendor_ID_from_the_update_form;

---------------------
--Products
---------------------

-----SELECT (READ)------

-- get all products information and their vendors' name
SELECT Products.productID, Vendors.name AS vendor, Products.productPrice, Products.productWeight, Products.productDescription, Products.productInStock, Products.productName
FROM Products
INNER JOIN Vendors
ON Products.vendorID = Vendors.vendorID;


------INSERT (CREATE)------

--get all vendor IDs and names to populate the vendors dropdown
SELECT vendorID, name FROM Vendors;

-- add a new product
INSERT INTO Products (vendorID, productPrice, productWeight, productDescription, productInStock, productName)
VALUES (:vendor_ID_from_dropdown_Input, :productPriceInput, :productWeightInput, :productDescriptionInput, :productInStockInput, :productNameInput);


------DELETE------

-- delete a product
DELETE FROM Products WHERE Products.productID = :product_ID_selected_from_product_page;


------UPDATE------

-- update a product's data based on submission of the update product form
SELECT productID, vendor, productPrice, productWeight, productDescription, productInStock, productName
    FROM Products
    WHERE productID = :product_ID_selected_from_product_page;

UPDATE Products
    SET vendor = :vendor_ID_from_dropdown_Input, productPrice = :productPriceInput, productWeight = :productWeightInput, 
    productDescription = :productDescriptionInput, productInStock = :productInStockInput, productName = :productNameInput
    WHERE productID = :product_ID_from_the_update_form;

---------------------
--Invoices
---------------------

-----SELECT (READ)------

-- get all invoices information
SELECT Invoices.invoiceID, Vendors.name AS vendor, Invoices.invoiceDate
FROM Invoices
INNER JOIN Vendors
ON Invoices.vendorID = Vendors.vendorID;

------INSERT (CREATE)------

--get all vendor IDs and names to populate the vendors dropdown (see Products Insert)

-- Add a new invoice
INSERT INTO Invoices (vendor, invoiceDate)
VALUES (:vendor_ID_from_dropdown_Input, :invoiceDateInput);

------DELETE------

-- remove an invoice
DELETE FROM Invoices WHERE Invoices.invoiceID = :invoice_ID_selected_from_invoice_page

------UPDATE------

SELECT invoiceID, vendor, invoiceDate
    FROM Invoices
    WHERE invoiceID = :invoice_ID_selected_from_invoice_page;

UPDATE Invoices
    SET vendor = :vendor_ID_from_dropdown_Input, invoiceDate = :invoiceDateInput
    WHERE invoice_ID_from_the_update_form;


--------------------
--Invoice_Items
--------------------

-----SELECT (READ)------

-- get all Invoice_Items information
SELECT Invoice_Items.InvoiceItemID, Invoice_Items.invoiceID, Products.productNAME AS product, Invoice_Items.orderQuantity, Invoice_Items.unitPrice
FROM Invoice_Items
INNER JOIN Products
ON Invoice_Items.productID = Products.productID;

------INSERT (CREATE)------

--get all product IDs and product names to populate the products dropdown
SELECT productID, productName FROM Products;

-- add a new invoice_item
INSERT INTO Invoice_Items (invoiceID, product, orderQuantity, unitPrice)
VALUES (:invoiceIDInput, :product_ID_from_dropdown_Input, :orderQuantityInput, :unitPriceInput);

------DELETE------

-- remove invoice item
DELETE FROM Invoice_Items WHERE Invoice_Items.InvoiceItemID = :invoice_item_id_selected_from_invoice_items_page

------UPDATE------
SELECT InvoiceItemID, invoiceID, product, orderQuantity, unitPrice
    FROM Invoice_Items
    WHERE InvoiceItemID = :invoice_item_id_selected_from_invoice_items_page;

UPDATE Invoice_Items
    SET invoiceID = :invoiceIDInput, product = :product_ID_from_dropdown_Input, orderQuantity = :orderQuantityInput, unitPrice = :unitPriceInput
    WHERE invoiceItemID = :invoice_item_ID_selected_from_the_update_form;


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

