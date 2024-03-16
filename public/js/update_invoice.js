/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/





// Get the objects we need to modify
let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    //debugger;

    // Get form fields we need to get data from
    let inputinvoiceID = document.getElementById("mySelect");
    let inputvendor = document.getElementById("update-vendorID");
    let inputdate = document.getElementById("update-invoicedate");


    // Get the values from the form fields
    let invoiceIDValue = inputinvoiceID.value;
    let nameValue = inputvendor.value;
    let dateValue = inputdate.value;


    // currently the database table for Vendors does not allow updating values to NULL
    // so we must abort if being passed NULL
    if (isNaN(invoiceIDValue) || isNaN(nameValue) || isNaN(dateValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        invoiceID: invoiceIDValue,
        vendorID: nameValue,
        invoiceDate: dateValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, invoiceIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, invoiceID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoice-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceID) {

            // Get the location of the row where we found the matching vendor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let vendorCell = updateRowIndex.getElementsByTagName("td")[1];
            let invoiceDateCell = updateRowIndex.getElementsByTagName("td")[2];


            // Reassign attributes to our value we updated to
            vendorCell.innerHTML = parsedData[0].vendorID;
            invoiceDateCell.innerHTML = parsedData[0].invoiceDate;


        }
    }
}
