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
PORT = 37152;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector') // Database

/*
    ROUTES
*/
app.get('/', function (req, res) {
    // Define our queries
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    query4 = 'SELECT * FROM diagnostic;';

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    // DROP TABLE...
    db.pool.query(query1, function (err, results, fields) {

        // CREATE TABLE...
        db.pool.query(query2, function (err, results, fields) {

            // INSERT INTO...
            db.pool.query(query3, function (err, results, fields) {

                // SELECT *...
                db.pool.query(query4, function (err, results, fields) {

                    // Send the results to the browser
                    res.send(JSON.stringify(results));
                });
            });
        });
    });
});                                       // requesting the web site.

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});