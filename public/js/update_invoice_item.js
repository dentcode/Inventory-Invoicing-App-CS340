/*
Students: Ignacio De La Cruz and Guibely De Aguinaga 
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/



// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-invoice-item-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceItem = document.getElementById("mySelect");
    let inputInvoiceID = document.getElementById("update-invoiceID");
    let inputProductID = document.getElementById("update-productID");
    let inputOrderQuantity = document.getElementById("update-orderQuantity");
    let inputUnitPrice = document.getElementById("update-unitPrice");


    // Get the values from the form fields
    let invoiceItemValue = inputInvoiceItem.value;
    let invoiceIDValue = inputInvoiceID.value;
    let productIDValue = inputProductID.value;
    let orderQuantityValue = inputOrderQuantity.value;
    let unitPriceValue = inputUnitPrice.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(invoiceIDValue) || isNaN(productIDValue) || isNaN(orderQuantityValue) || isNaN(unitPriceValue)) {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        invoiceItemID: invoiceItemValue,
        invoiceID: invoiceIDValue,
        productID: productIDValue,
        orderQuantity: orderQuantityValue,
        unitPrice: unitPriceValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoice-item-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceItemID) {

            // Get the location of the row where we found the matching invoice item ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of different values
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            let td4 = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign the cells to our value we updated to
            td1.innerHTML = parsedData[0].invoiceID;
            td2.innerHTML = parsedData[0].productID;
            td3.innerHTML = parsedData[0].orderQuantity;
            td4.innerHTML = parsedData[0].unitPrice;

        }
    }
}
