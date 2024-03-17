/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
as the skeleton code.
*/

function deleteInvoice(invoiceID) {
    debugger;
    let link = '/delete-invoice-ajax/';
    let data = {
        invoiceID: invoiceID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(invoiceID);
        }
    });
}

function deleteRow(invoiceID) {
    let table = document.getElementById("invoice-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == invoiceID) {
            table.deleteRow(i);
            deleteDropDownMenu(invoiceID);
            break;
        }
    }
}

function deleteDropDownMenu(invoiceID) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(invoiceID)) {
            selectMenu[i].remove();
            break;
        }

    }
}

/*
function deleteVendor(vendorID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: vendorID
    };
    debugger;
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-vendor-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(vendorID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(vendorID) {

    let table = document.getElementById("vendor-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == vendorID) {
            table.deleteRow(i);
            break;
        }
    }
}
*/