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

// vendor post

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

    db.pool.query(query1, function (error, rows, fields) {

        res.render('product', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
});

// POST PRODUCTS

app.post('/add-product-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO PRODUCTS (vendorID, productPrice, productWeight, productDescription, productInStock, productName) VALUES ('${data.vendorID}', '${data.price}', '${data.weight}', '${data.description}', '${data.instock}', '${data.name}')`;
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

    let vendorID = parseInt(data.vid);
    let price = data.price
    let weight = data.weight
    let description = data.description
    let instock = data.instock
    let name = data.name

    let productID = parseInt(data.pid)


    let queryUpdateProduct = `UPDATE Products SET vendorID = ?, productPrice = ?, productWeight = ?, productDescription = ?, productInStock = ?, productName = ? WHERE productID = ?`;
    let selectProduct = `SELECT * FROM Products;`;


    // Run the 1st query
    db.pool.query(queryUpdateProduct, [vendorID, price, weight, description, instock, name, productID], function (error, rows, fields) {
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

    db.pool.query(query1, function (error, rows, fields) {

        res.render('invoice', { data: rows });  // Note the call to render() and not send(). Using render() ensures the templating engine
    })  // will process this file, before sending the finished HTML to the client.
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

// UPDATE VENDORS

app.put('/put-invoice-ajax', function (req, res, next) {
    let data = req.body;


    let vendorID = parseInt(data.vendorid);
    let date = data.date
    let invoiceID = parseInt(data.invoiceid);

    let queryUpdateInvoice = `UPDATE Invoices SET vendorID = ?, invoiceDate = ? WHERE invoiceID = ?`;
    let selectVendor = `SELECT * FROM Invoices;`;


    // Run the 1st query
    db.pool.query(queryUpdateInvoice, [vendorID, date, invoiceID], function (error, rows, fields) {
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

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
