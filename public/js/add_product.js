/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
as the skeleton code.
*/

// Get the objects we need to modify
let addvendorForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addvendorForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    debugger;


    // Get form fields we need to get data from
    let inputVendor = document.getElementById("input-vname");
    let inputProductPrice = document.getElementById("input-price");
    let inputProductWeight = document.getElementById("input-weight");
    let inputProductDescription = document.getElementById("input-description");
    let inputProductInStock = document.getElementById("input-instock");
    let inputProductName = document.getElementById("input-name");

    // Get the values from the form fields
    let vendorNameValue = inputVendor.value;
    let productPriceValue = inputProductPrice.value;
    let productWeightValue = inputProductWeight.value;
    let productDescriptionValue = inputProductDescription.value;
    let productInStockValue = inputProductInStock.value;
    let productNameValue = inputProductName.value;


    // Put our data we want to send in a javascript object
    let data = {
        vendorID: vendorNameValue,
        price: productPriceValue,
        weight: productWeightValue,
        description: productDescriptionValue,
        instock: productInStockValue,
        name: productNameValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVendor.value = '';
            inputProductPrice.value = '';
            inputProductWeight.value = '';
            inputProductDescription.value = '';
            inputProductInStock.value = '';
            inputProductName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// vendor
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("product-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let vendorCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let weightCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let instockCell = document.createElement("TD");
    let nameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.productID;    // needs to match attribute name in database
    vendorCell.innerText = newRow.vendorID;
    emailCell.innerText = newRow.productPrice;
    priceCell.innerText = newRow.productWeight;
    weightCell.innerText = newRow.productDescription;
    descriptionCell.innerText = newRow.productInStock;
    instockCell.innerText = newRow.Name;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteVendor(newRow.productID);
    }


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(vendorCell);
    row.appendChild(priceCell);
    row.appendChild(weightCell);
    row.appendChild(descriptionCell);
    row.appendChild(instockCell);
    row.appendChild(nameCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.productID);
    // Add the row to the table
    currentTable.appendChild(row);
}
