/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/


// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
  

    // Get form fields we need to get data from
    let inputcID = document.getElementById("mySelect");
    let inputcname = document.getElementById("update-name");
    let inputcemail = document.getElementById("update-email");

    // Get the values from the form fields
    let customerIDValue = inputcID.value;
    let nameValue = inputcname.value;
    let emailValue = inputcemail.value;


    // Put our data we want to send in a javascript object
    let data = {
        customerID: customerIDValue,
        name: nameValue,
        email: emailValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerIDValue);

            // Clear the input fields for another transaction
            inputcID.value = '';
            inputcname.value = '';
            inputcemail.value = '';
            

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let nameCell = updateRowIndex.getElementsByTagName("td")[1];
            let emailCell = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign attributes to our value we updated to
            nameCell.innerHTML = parsedData[i -1].name;
            emailCell.innerHTML = parsedData[i - 1].email;

        }
    }
}