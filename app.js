/* 
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database 
as the skeleton code.
*/

// App.js

/*
    SETUP
*/

var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 38153;                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

var db = require('./database/db-connector') // Database



/*
    ROUTES
*/

app.get('/', function (req, res) {
    res.render('index');

    // will process this file, before sending the finished HTML to the client.
});




//////// CUSTOMERS /////////

// get customers

app.get('/customer', function (req, res) {
    let query1 = "SELECT * FROM Customers;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('customer', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
});

// customer post

app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email) VALUES ('${data.name}', '${data.email}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


//DELETE Customers

app.delete('/delete-customer-ajax/', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;



    // Run the 1st query
    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});


// UPDATE customer

app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;


    let name = data.name;
    let email = data.email;
    let customerID = parseInt(data.customerID);


    let queryUpdateCustomer = `UPDATE Customers SET name = ?, email = ? WHERE customerID = ?`;
    let selectCustomer = `SELECT * FROM Customers;`;


    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [name, email, customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectCustomer, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


/////////// SALES ////////////

app.get('/sales', function (req, res) {
    let query1 = "SELECT * FROM Sales;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('sales', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
});


// sales post

app.post('/add-sales-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (customerID, date, total) VALUES ('${data.customerID}', '${data.date}', '${data.total}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Sales;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// Delete Sales

app.delete('/delete-sales-ajax/', function (req, res, next) {
    let data = req.body;
    let salesID = parseInt(data.salesID);
    let deleteSales = `DELETE FROM Sales WHERE salesID = ?`;



    // Run the 1st query
    db.pool.query(deleteSales, [salesID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

// UPDATE Sales

app.put('/put-sales-ajax', function (req, res, next) {
    let data = req.body;

    let customerID = parseInt(data.customerID);
    let date = data.date;
    let total = data.total;

    let salesID = parseInt(data.salesID);

    let queryUpdateSales = `UPDATE Sales SET customerID = ?, date = ?, total = ? WHERE salesID = ?`;
    let selectSales = `SELECT * FROM Sales`;


    // Run the 1st query
    db.pool.query(queryUpdateSales, [customerID, date, total, salesID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectSales, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


////////// MENU ITEMS /////////

// get menuItems

app.get('/menu_items', function (req, res) {
    let query1 = "SELECT * FROM Menu_Items;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('menu_items', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
});

// menuItems post

app.post('/add-menuItem-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Menu_Items (name, listedPrice, menuItemQuanity) VALUES ('${data.name}', '${data.listedPrice}', '${data.menuItemQuanity}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Menu_Items;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


//DELETE MenuItem

app.delete('/delete-menuItem-ajax/', function (req, res, next) {
    let data = req.body;
    let menuItemID = parseInt(data.menuItemID);
    let deleteMenuItem = `DELETE FROM Menu_Items WHERE menuItemID = ?`;



    // Run the 1st query
    db.pool.query(deleteMenuItem, [menuItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});


// UPDATE MENU_ITEMS

app.put('/put-menuItem-ajax', function (req, res, next) {
    let data = req.body;

    let name = data.name;
    let listedPrice = data.listedPrice;
    let menuItemQuanity = data.menuItemQuanity;

    let menuItemID = parseInt(data.menuItemID);

    let queryUpdateMenuItems = `UPDATE Menu_Items SET name = ?, listedPrice = ?, menuItemQuanity = ? WHERE menuItemID = ?`;
    let selectMenuItems = `SELECT * FROM Menu_Items`;


    // Run the 1st query
    db.pool.query(queryUpdateMenuItems, [name, listedPrice, menuItemQuanity, menuItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectMenuItems, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});




///////////// SALES_ITEMS ///////////

app.get('/sales_items', function (req, res) {
    let query1 = "SELECT * FROM Sales_Items;";               // Define our query

    let query2 = "SELECT * FROM Sales";

    let query3 = "SELECT * FROM Menu_Items";



    db.pool.query(query1, function (error, rows, fields) {    // Run the 1st query

        let sales_items = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let sales = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let menuItems = rows;

                // BEGINNING OF NEW CODE
                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let menuItemsmap = {}
                menuItems.map(menuItem => {
                    let menuItemID = parseInt(menuItem.menuItemID, 10);

                    menuItemsmap[menuItemID] = menuItem["name"];
                })

                // Overwrite the menuItem ID with the name of the planet in the people object
                sales_items = sales_items.map(sale_item => {
                    return Object.assign(sale_item, { menuItemID: menuItemsmap[sale_item.menuItemID] })
                })

                // END OF NEW CODe

                return res.render('sales_items', { data: sales_items, sales: sales, menuItems: menuItems });
            })
        })
    })
});


// sales-items post

app.post('/add-sales-item-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Sales_Items (salesID, menuItemID, orderQuantity, unitPrice) VALUES ('${data.salesID}', '${data.menuItemID}', '${data.orderQuantity}', '${data.unitPrice}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Sales_Items;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

//DELTE SALES_ITEMS

app.delete('/delete-sales-item-ajax/', function (req, res, next) {
    let data = req.body;
    let salesItemID = parseInt(data.salesItemID);
    let deleteSalesItem = `DELETE FROM Sales_Items WHERE salesItemID = ?`;



    // Run the 1st query
    db.pool.query(deleteSalesItem, [salesItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            res.sendStatus(204);
        }
    })
});


// UPDATE SALES_ITEMS

app.put('/put-sales-item-ajax', function (req, res, next) {
    let data = req.body;

    let salesID = parseInt(data.salesID);
    let menuItemID = parseInt(data.menuItemID);
    let quantity = data.orderQuantity;
    let unitPrice = data.unitPrice;

    let salesItemID = parseInt(data.salesItemID);

    let queryUpdateSalesItems = `UPDATE Sales_Items SET salesID = ?, menuItemID = ?, orderQuantity = ?, unitPrice = ? WHERE salesItemID = ?`;
    let selectSalesItems = `SELECT * FROM Sales_Items`;


    // Run the 1st query
    db.pool.query(queryUpdateSalesItems, [salesID, menuItemID, quantity, unitPrice, salesItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectSalesItems, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});




/////////////////////////////////////////
////             VENDORS            ////
///////////////////////////////////////

// GET VENDORS

app.get('/vendor', function (req, res) {
    let query1 = "SELECT * FROM Vendors;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('vendor', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
});

// POST VENDORS

app.post('/add-vendor-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Vendors (name, phone, email) VALUES ('${data.vname}', '${data.vphone}', '${data.vemail}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Vendors
            query2 = `SELECT * FROM Vendors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// DELETE VENDORS

app.delete('/delete-vendor-ajax/', function (req, res, next) {
    let data = req.body;
    let vendorID = parseInt(data.vendorID);
    let deleteVendor = `DELETE FROM Vendors WHERE vendorID = ?`;



    // Run the 1st query
    db.pool.query(deleteVendor, [vendorID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            res.sendStatus(204);
        }
    })
});


// UPDATE VENDORS

app.put('/put-vendor-ajax', function (req, res, next) {
    let data = req.body;


    let name = data.vname;
    let phone = data.vphone;
    let email = data.vemail;
    let vendorID = parseInt(data.vid);


    let queryUpdateVendor = `UPDATE Vendors SET name = ?, phone = ?, email = ? WHERE vendorID = ?`;
    let selectVendor = `SELECT * FROM Vendors;`;


    // Run the 1st query
    db.pool.query(queryUpdateVendor, [name, phone, email, vendorID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectVendor, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/////////////////////////////////////////
////           PRODUCTS             ////
///////////////////////////////////////

// GET PRODUCTS

app.get('/product', function (req, res) {
    let query1 = "SELECT * FROM Products;";

    let query2 = "SELECT * FROM Vendors;"

    db.pool.query(query1, function (error, rows, fields) {

        let products = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let vendors = rows;

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let vendormap = {}
            vendors.map(vendor => {
                let vendorID = parseInt(vendor.vendorID, 10);

                vendormap[vendorID] = vendor["name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            products = products.map(product => {
                return Object.assign(product, { vendorID: vendormap[product.vendorID] })
            })

            // END OF NEW CODE

            return res.render('product', { data: products, vendors: vendors });

        })
    })
});

// POST PRODUCTS

app.post('/add-product-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (vendorID, productPrice, productWeight, productDescription, productInStock, productName) VALUES ('${data.vendorID}', '${data.price}', '${data.weight}', '${data.description}', '${data.instock}', '${data.name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Vendors
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// DELETE PRODUCTS

app.delete('/delete-product-ajax/', function (req, res, next) {
    let data = req.body;
    let productID = parseInt(data.productID);
    let deleteProduct = `DELETE FROM Products WHERE productID = ?`;



    // Run the 1st query
    db.pool.query(deleteProduct, [productID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            res.sendStatus(204);
        }
    })
});

// UPDATE PRODUCTS

app.put('/put-product-ajax', function (req, res, next) {
    let data = req.body;

    // let vendorID = parseInt(data.vendorID);
    let price = data.productPrice
    let weight = data.productWeight
    let description = data.productDescription
    let instock = data.productInStock
    let name = data.productName

    let productID = parseInt(data.productID)


    let queryUpdateProduct = `UPDATE Products SET productPrice = ?, productWeight = ?, productDescription = ?, productInStock = ?, productName = ? WHERE productID = ?`;
    let selectProduct = `SELECT * FROM Products;`;


    // Run the 1st query
    db.pool.query(queryUpdateProduct, [price, weight, description, instock, name, productID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectProduct, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});



/////////////////////////////////////////
////           INVOICES             ////
///////////////////////////////////////


// GET INVOICES

app.get('/invoice', function (req, res) {
    let query1 = "SELECT * FROM Invoices;";

    let query2 = "SELECT * FROM Vendors;"

    db.pool.query(query1, function (error, rows, fields) {

        let invoices = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let vendors = rows;

            // BEGINNING OF NEW CODE

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let vendormap = {}
            vendors.map(vendor => {
                let vendorID = parseInt(vendor.vendorID, 10);

                vendormap[vendorID] = vendor["name"];
            })

            // Overwrite the homeworld ID with the name of the planet in the people object
            invoices = invoices.map(invoice => {
                return Object.assign(invoice, { vendorID: vendormap[invoice.vendorID] })
            })

            // END OF NEW CODE

            return res.render('invoice', { data: invoices, vendors: vendors });
        })
    })
});


// POST INVOICES

app.post('/add-invoice-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Invoices (vendorID, invoiceDate) VALUES ('${data.vendorID}', '${data.date}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Vendors
            query2 = `SELECT * FROM Invoices;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// DELETE INVOICES

app.delete('/delete-invoice-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceID = parseInt(data.invoiceID);
    let deleteInvoice = `DELETE FROM Invoices WHERE invoiceID = ?`;



    // Run the 1st query
    db.pool.query(deleteInvoice, [invoiceID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            res.sendStatus(204);
        }
    })
});

// UPDATE INVOICES

app.put('/put-invoice-ajax', function (req, res, next) {
    let data = req.body;


    // let vendorID = parseInt(data.vendorID);
    let date = data.invoiceDate
    let invoiceID = parseInt(data.invoiceID);

    let queryUpdateInvoice = `UPDATE Invoices SET invoiceDate = ? WHERE invoiceID = ?`;
    let selectInvoice = `SELECT * FROM Invoices;`;


    // Run the 1st query
    db.pool.query(queryUpdateInvoice, [date, invoiceID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectInvoice, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});





/////////////////////////////////////////
////        INVOICE_ITEMS           ////
///////////////////////////////////////

app.get('/invoice_item', function (req, res) {
    let query1 = "SELECT * FROM Invoice_Items;";               // Define our query

    let query2 = "SELECT * FROM Invoices";

    let query3 = "SELECT * FROM Products";



    db.pool.query(query1, function (error, rows, fields) {    // Run the 1st query

        let invoice_items = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let invoices = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let products = rows;

                // BEGINNING OF NEW CODE
                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let productmap = {}
                products.map(product => {
                    let productID = parseInt(product.productID, 10);

                    productmap[productID] = product["productName"];
                })

                // Overwrite the homeworld ID with the name of the planet in the people object
                invoice_items = invoice_items.map(invoice_item => {
                    return Object.assign(invoice_item, { productID: productmap[invoice_item.productID] })
                })

                // END OF NEW COD

                return res.render('invoice_item', { data: invoice_items, invoices: invoices, products: products });
            })
        })
    })
});


// POST INVOICE_ITEMS

app.post('/add-invoice-item-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Invoice_Items (invoiceID, productID, orderQuantity, unitPrice) VALUES ('${data.invoiceID}', '${data.productID}', '${data.orderQuantity}', '${data.unitPrice}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Vendors
            query2 = `SELECT * FROM Invoice_Items;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE INVOICE_ITEMS


app.delete('/delete-invoice-item-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceItemID = parseInt(data.invoiceItemID);
    let deleteInvoiceItem = `DELETE FROM Invoice_Items WHERE invoiceItemID = ?`;



    // Run the 1st query
    db.pool.query(deleteInvoiceItem, [invoiceItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // Run the second query
            res.sendStatus(204);
        }
    })
});

// UPDATE INVOICE ITEMS

app.put('/put-invoice-item-ajax', function (req, res, next) {
    let data = req.body;

    // let invoiceID = parseInt(data.invoiceID);
    // let productID = parseInt(data.productID);
    let orderQuantity = data.orderQuantity;
    let unitPrice = data.unitPrice;
    let invoiceItemID = parseInt(data.invoiceItemID);

    // let queryUpdateWorld = `UPDATE Invoice_Items SET invoiceID = ?, productID = ?, orderQuantity = ?, unitPrice = ? WHERE Invoice_Items.invoiceItemID = ?`;
    let queryUpdateWorld = `UPDATE Invoice_Items SET orderQuantity = ?, unitPrice = ? WHERE Invoice_Items.invoiceItemID = ?`
    // let selectWorld = `SELECT * FROM Products WHERE productID = ?`;
    let selectWorld = `SELECT * FROM Invoice_Items`;

    // Run the 1st query
    db.pool.query(queryUpdateWorld, [orderQuantity, unitPrice, invoiceItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectWorld, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
