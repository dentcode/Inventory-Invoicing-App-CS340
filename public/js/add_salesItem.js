/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
as the skeleton code.
*/

// Get the objects we need to modify
let addSalesItemForm = document.getElementById('add-sales-item-form-ajax');

// Modify the objects we need
addSalesItemForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputsalesID = document.getElementById("input-salesID");
    let inputMenuItemID = document.getElementById("input-menuItemID");
    let inputorderQuantity = document.getElementById("input-orderQuantity");
    let inputunitPrice = document.getElementById("input-unitPrice");

    // Get the values from the form fields
    let salesIDValue = inputsalesID.value;
    let menuItemIDValue = inputMenuItemID.value;
    let orderQuantityValue = inputorderQuantity.value;
    let unitPriceValue = inputunitPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        salesID: salesIDValue,
        menuItemID: menuItemIDValue,
        orderQuantity: orderQuantityValue,
        unitPrice: unitPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sales-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputsalesID.value = '';
            inputMenuItemID.value = '';
            inputorderQuantity.value = '';
            inputunitPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-item-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let salesIDCell = document.createElement("TD");
    let menuItemIDCell = document.createElement("TD");
    let orderQuantityCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");

    // Fill the cells with correct data
    salesIDCell.innerText = newRow.salesID;
    menuItemIDCell.innerText = newRow.salesID;
    orderQuantityCell.innerText = newRow.orderQuantity;
    unitPriceCell.innerText = newRow.unitPrice;

    // Add the cells to the row 
    row.appendChild(salesIDCell);
    row.appendChild(menuItemIDCell);
    row.appendChild(orderQuantityCell);
    row.appendChild(unitPriceCell);

    // Add the row to the table
    currentTable.appendChild(row);
}