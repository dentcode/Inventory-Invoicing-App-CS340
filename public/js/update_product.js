/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/





// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updateProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // debugger;

    // Get form fields we need to get data from
    let inputproductID = document.getElementById("mySelect");
    let inputvname = document.getElementById("update-vname");
    let inputprice = document.getElementById("update-price");
    let inputweight = document.getElementById("update-weight");
    let inputdescription = document.getElementById("update-description");
    let inputinstock = document.getElementById("update-instock");
    let inputname = document.getElementById("update-name");

    // Get the values from the form fields
    let productValue = inputproductID.value;
    let vendorValue = inputvname.value;
    let priceValue = inputprice.value;
    let weightValue = inputweight.value;
    let descriptionValue = inputdescription.value;
    let instockValue = inputinstock.value;
    let nameValue = inputname.value;

    // currently the database table for Vendors does not allow updating values to NULL
    // so we must abort if being passed NULL
    if (isNaN(productValue) || isNaN(vendorValue) || isNaN(priceValue) || isNaN(weightValue) || isNaN(descriptionValue) || isNaN(instockValue) || isNaN(nameValue)){
        return
    }

    // Put our data we want to send in a javascript object
    let data = {
        productID: productValue,
        vendorID: vendorValue,
        productPrice: priceValue,
        productWeight: weightValue,
        productDescription: descriptionValue,
        productInStock: instockValue,
        productName: nameValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, productValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, productID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == productID) {

            // Get the location of the row where we found the matching vendor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let vendorCell = updateRowIndex.getElementsByTagName("td")[1];
            let priceCell = updateRowIndex.getElementsByTagName("td")[2];
            let weightCell = updateRowIndex.getElementsByTagName("td")[3];
            let descriptionCell = updateRowIndex.getElementsByTagName("td")[4];
            let instockCell = updateRowIndex.getElementsByTagName("td")[5];
            let nameCell = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign attributes to our value we updated to
            vendorCell.innerHTML = parsedData[0].vendorID;
            priceCell.innerHTML = parsedData[0].productPrice;
            weightCell.innerHTML = parsedData[0].productWeight;
            descriptionCell.innerHTML = parsedData[0].productDescription;
            instockCell.innerHTML = parsedData[0].productInStock;
            nameCell.innerHTML = parsedData[0].productName;

        }
    }
}
