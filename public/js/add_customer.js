/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
as the skeleton code.
*/


// Get the objects that need to be modified
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects needed
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-cname");
    let inputEmail = document.getElementById("input-cemail");
    

    // Get the values from the form fields
    let nameValue = inputCustomerName.value;
    let emailValue = inputEmail.value;


    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 2 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let cNameCell = document.createElement("TD");
    let cEmailCell = document.createElement("TD");
 

    let deleteCell = document.createElement("TD");
 

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    cNameCell.innerText = newRow.name;
    cEmailCell.innerText = newRow.email;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(cNameCell);
    row.appendChild(cEmailCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customerID);

    // Add the row to the table
    currentTable.appendChild(row);
}