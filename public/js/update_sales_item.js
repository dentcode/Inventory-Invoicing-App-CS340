/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/


// Get the objects we need to modify
let updateSalesItemForm = document.getElementById('update-sales-item-form-ajax');

// Modify the objects we need
updateSalesItemForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
  

    // Get form fields we need to get data from
    let inputsalesItemID = document.getElementById("update-salesItemID");
    let inputsID = document.getElementById("update-salesID");
    let inputmID = document.getElementById("update-menuID");
    let inputQuantity = document.getElementById("update-quantity");
    let inputUnitPrice = document.getElementById("update-unitPrice");

    // Get the values from the form fields
    let salesItemIDValue = inputsalesItemID.value;
    let salesIDValue = inputsID.value;
    let menuItemIDValue = inputmID.value;
    let quantityValue = inputQuantity.value;
    let unitPriceValue = inputUnitPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        salesItemID: salesItemIDValue,
        salesID: salesIDValue,
        menuItemID: menuItemIDValue,
        orderQuantity: quantityValue,
        unitPrice: unitPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sales-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, salesItemIDValue);

            inputsalesItemID.value = '';
            inputsID.value = '';
            inputmID.value = '';
            inputQuantity.value = '';
            inputUnitPrice.value = '';

            window.location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, salesItemID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("sales-item-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == salesItemID) {

            // Get the location of the row where we found the matching sales ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let salesIDCell = updateRowIndex.getElementsByTagName("td")[1];
            let menuItemIDCell = updateRowIndex.getElementsByTagName("td")[2];
            let orderQuantityCell = updateRowIndex.getElementsByTagName("td")[3];
            let unitPriceCell = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign attributes to our value we updated to
            salesIDCell.innerHTML = parsedData[i -1].salesID;
            menuItemIDCell.innerHTML = parsedData[i - 1].menuItemID;
            orderQuantityCell.innerHTML = parsedData[i - 1].orderQuantity;
            unitPriceCell.innerHTML = parsedData[i - 1].unitPrice;

        }
    }
}