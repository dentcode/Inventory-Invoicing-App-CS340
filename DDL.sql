-- Project Step 2 Draft DDL
--Team 39
-- Ignacio De La Cruz and Guibely De Aguinaga

-- Citation for starting code:
-- Date: 2/6/2024
-- Copied starting code for setting foreign key checks and autocommit from 
-- https://canvas.oregonstate.edu/courses/1946034/assignments/9456214?module_item_id=23809320

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Records contact information about vendors. NOTES: phone varchar(20) to accomodate international phones.
CREATE OR REPLACE TABLE Vendors (
    vendorID INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (vendorID)
);

-- Records information about products and ingredients used in the bakery. NOTES: productWeight measurement unit is pounds (lbs). For productInStock attribute boolean choice for whether in stock (1) or not (0).

CREATE OR REPLACE TABLE Products (
    productID INT AUTO_INCREMENT NOT NULL,
    vendorID INT,
    productPrice DECIMAL(16,2) NOT NULL,
    productWeight DECIMAL(16,2) NOT NULL,
    productDescription VARCHAR(1000),
    productInStock INT, NOT NULL,
    productName: VARCHAR(255) NOT NULL,
    PRIMARY KEY (productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- Records the total amount paid to vendors for ordered products.
CREATE OR REPLACE TABLE Invoices (
    invoiceID INT AUTO_INCREMENT,
    vendorID INT,
    invoiceDate DATE NOT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

-- Records the items that are included in each invoice.
CREATE OR REPLACE TABLE Invoice_Items (
    invoiceItemsID INT AUTO_INCREMENT NOT NULL,
    invoiceID INT,
    productID INT,
    orderQuantity INT NOT NULL,
    unitPrice DECIMAL(16,2) NOT NULL
    PRIMARY KEY (invoiceItemsID),
    FOREIGN KEY (invoiceID) REFERENCES Invoices(invoiceID) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productsID)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


... [your SQL goes here]




-- SAMPLE DATA

INSERT INTO Vendors (
    name,
    phone,
    email
)
VALUES
(
    "King Arthur",
    "229-333-4444",
    "king_arthur@test.com"
),
(
    "Nestle",
    "217-222-3333",
    "nestle@test.com"
),
(
    "Flour USA",
    "617-928-5094",
    "flourusa@test.com"
),
(
    "Cal-Maine",
    "518-098-3453",
    "cal-main@test.com"
),
(
    "Prairie Farms Dairy",
    "208-987-0098",
    "prairiefarms@test.com"
);

INSERT INTO Products (
    vendorID,
    productPrice,
    productWeight,
    productDescription,
    productInStock,
    productName
)
VALUES
(
    1,
    179.99,
    100,
    "The best all purpose flour in all of camelot.",
    1,
    "All Purpose Flour"
),
(
    1,
    150.00,
    80.50,
    "The best whole wheat flour in all of Camlot.",
    1,
    "Whole Wheat Flour"
),
(
    1,
    300.23,
    50,
    "Certified organic artisan flour fit for a king. ",
    0,
    "Organic Artisan Flour"
),
(
    3,
    999.99,
    1000,
    "The cheapest all purpose flour in all of the USA. Processed in a facility that also processes seafood.",
    1,
    "All Purpose Flour"
),
(
    3,
    750.00,
    500,
    "Produced by pasture fed dairy cows. Storage tank not included.",
    1,
    "Whole Milk"
);

INSERT INTO Invoices (
    vendorID,
    invoiceDate
)
VALUES
(
    1,
    "2023-01-19"															
),
(
    3,
    "2024-01-19"	
),
(
    1,
    "2024-01-23"	
),
(
    5,
    "2024-02-01"		
);

INSERT INTO Invoice_Items (
    invoiceID,
    productID,
    orderQuantity,
    unitPrice
)
VALUES
(
    1,
    1,
    5,
    179.99
),
(
    1,
    2,
    3,
    140.00
),
(
    2,
    4,
    1,
    999.99
),
(
    3,
    2,
    3,
    150.00
),
(
    4,
    5,
    1,
    750.00
);

SELECT * FROM ;
SELECT * FROM ;
SELECT * FROM ;
SELECT * FROM ;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;