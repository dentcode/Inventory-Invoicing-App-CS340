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

---- READ ----
-- get all information from customers
SELECT * FROM Customers;

---- INSERT (CREATE) -----
-- Insert into customers/ new customer
INSERT INTO Customers (name, email)
VALUES (:nameInput, :emailInput);


------DELETE------

-- remove a customer
DELETE FROM Customers WHERE Customers.customerID = :customer_ID_selected_from_customer_page;

------UPDATE------

-- update a customer's data based on submission of the update customer form
SELECT customerID, name, email
    FROM Customers
    WHERE customerID = :customer_ID_selected_from_customer_page;

UPDATE Customers
    SET name = :nameInput, email = :emailInput
    WHERE customerID = :customer_ID_from_the_update_form;

---------------------
--Sales
---------------------


---- READ ----
-- get customers sale
SELECT Customers.name AS Customer, Customers.customerID, Sales.salesID, Sales.date, Sales.total  
FROM Sales 
INNER JOIN Customers ON Sales.customerID = Customers.customerID
WHERE Customers.customerID = :customer_ID_selected_from_customer_page;

---- INSERT (CREATE) ----
-- Insert into sales
INSERT INTO Sales (customerID, date)
VALUES (:customerIDInput, :dateInput);

-- remove a sale
DELETE FROM Sales WHERE Sales.salesID = :sales_ID_selected_from_customer_page;

------UPDATE------

-- update a sale's data, based on submission of the update sales form
SELECT salesID, customerID, date, total
    FROM Sales
    WHERE salesID = :sales_ID_selected_from_customer_page;

UPDATE Sales
    SET date = :dateInput, total = :totalInput
    WHERE salesID = :sales_ID_from_the_update_form;

---------------------
--- Menu_Items
---------------------
--- READ ---
-- get all menu items
SELECT * FROM Menu_Items

-- look for menu item ID by name
SELECT menuItemID FROM Menu_Items
WHERE name = :nameInput

--- CREATE ---
-- Insert into Menu items
INSERT INTO Menu_Items (name, listedPrice, menuItmeQuanity)
VALUES (:nameInput, :listedPriceInput, :menuItmeQuanityInput);

--- UPDATE ---

--get IDs and names to populate dropdown
SELECT menuItemID, name, FROM Menu_Items

-- Update price and quanity in menu Items by name dropdown
UPDATE Menu_Items 
SET listedPrice = :listedPriceInput, menuItmeQuanity = :menuItmeQuanityInput
WHERE name = :name_menu_item_from_dropdown_input

--- DELETE ---
-- Delete Menu Item by name
DELETE FROM Menu_Items
WHERE name = :name_menu_item_from_dropdown_input


---------------------
---Sales_Items
---------------------
--- READ ---
--- get informtation about a sales item by salesID
SELECT Menu_Items.name AS "Item name", Menu_Items.menuItemID, Sales.salesID, Sales_Items.orderQuantity, Sales_Items.unitPrice 
FROM Sales_Items
INNER JOIN Menu_Items ON Sales_Items.menuItemId = Menu_Items.menuItemID 
INNER JOIN Sales ON Sales_Items.salesID = Sales.salesID
WHERE Sales.salesID = :salesIDInput;


--- CREATE ----

-- Insert into Sales Items
INSERT INTO Sales_Items (salesID, menuItemID, orderQuantity, unitPrice)
VALUES (:salesID, :menuItemIDInput, :orderQuantityInput, :unitPriceInput);

--- UPDATE ---

--get IDs and names to populate dropdown
SELECT salesItemID, FROM Sales_Items

-- Update order quanities and unit price in Sales Items by salesID dropdown
UPDATE Sales_Items
SET  salesID = :salesIDInput, menuItemID = :menuItemIDInput, orderQuantity = :orderQuantityInput, unitPrice = :unitPriceInput
WHERE salesItemID = :sales_item_id_from_dropdown_input



