/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
as the skeleton code.
*/

// Get the objects we need to modify
let addPersonForm = document.getElementById('add-invoice-item-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputinvoiceID = document.getElementById("input-invoiceID");
    let inputproductID = document.getElementById("input-productID");
    let inputorderQuantity = document.getElementById("input-orderQuantity");
    let inputunitPrice = document.getElementById("input-unitPrice");

    // Get the values from the form fields
    let invoiceIDValue = inputinvoiceID.value;
    let productIDValue = inputproductID.value;
    let orderQuantityValue = inputorderQuantity.value;
    let unitPriceValue = inputunitPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoiceID: invoiceIDValue,
        productID: productIDValue,
        orderQuantity: orderQuantityValue,
        unitPrice: unitPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputinvoiceID.value = '';
            inputproductID.value = '';
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
    let currentTable = document.getElementById("invoice-item-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let invoiceIDCell = document.createElement("TD");
    let productIDCell = document.createElement("TD");
    let orderQuantityCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceItemID;
    invoiceIDCell.innerText = newRow.invoiceID;
    productIDCell.innerText = newRow.productID;
    orderQuantityCell.innerText = newRow.orderQuantity;
    unitPriceCell.innerText = newRow.unitPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deletePerson(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(invoiceIDCell);
    row.appendChild(productIDCell);
    row.appendChild(orderQuantityCell);
    row.appendChild(unitPriceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceItemID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.invoiceItemID;
    option.value = newRow.invoiceItemID;
    selectMenu.add(option);
    // End of new step 8 code.
}