-- Project Step 3 Draft DML
--Team 39
-- Ignacio De La Cruz and Guibely De Aguinaga

SELECT * FROM Vendors;

SELECT Products.productID, Vendors.name AS vendor, Products.productPrice, Products.productWeight, Products.productDescription, Products.productInStock, Products.productName
FROM Products
INNER JOIN Vendors
ON Products.vendorID = Vendors.vendorID;

SELECT Invoices.invoiceID, Vendors.name AS vendor, Invoices.InvoiceDate
FROM Invoices
INNER JOIN Vendors
ON Invoices.vendorID = Vendors.vendorID;

SELECT * FROM Invoice_Items;