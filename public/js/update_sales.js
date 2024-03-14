/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/


// Get the objects we need to modify
let updateSalesForm = document.getElementById('update-sales-form-ajax');

// Modify the objects we need
updateSalesForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
  

    // Get form fields we need to get data from
    let inputsID = document.getElementById("mySelect");
    let inputcID = document.getElementById("update-customer");
    let inputDate = document.getElementById("update-date");
    let inputTotal = document.getElementById("update-total");

    // Get the values from the form fields
    let salesIDValue = inputsID.value;
    let customerValue = inputcID.value;
    let dateValue = inputDate.value;
    let totalValue = inputTotal.value;


    // Put our data we want to send in a javascript object
    let data = {
        salesID: salesIDValue,
        customerID: customerValue,
        date: dateValue,
        total: totalValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sales-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, salesIDValue);

            inputsID.value = '';
            inputcID.value = '';
            inputDate.value = '';
            inputTotal.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, salesID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == salesID) {

            // Get the location of the row where we found the matching sales ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let customerCell = updateRowIndex.getElementsByTagName("td")[1];
            let dateCell = updateRowIndex.getElementsByTagName("td")[2];
            let totalCell = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign attributes to our value we updated to
            customerCell.innerHTML = parsedData[i -1].customerID;
            dateCell.innerHTML = parsedData[i - 1].date;
            totalCell.innerHTML = parsedData[i - 1].total;

        }
    }
}