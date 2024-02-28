/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/





// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-vendor-form-ajax');

// Modify the objects we need
updateVendorForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputvID = document.getElementById("mySelect");
    let inputvname = document.getElementById("input-vname");
    let inputvphone = document.getElementById("input-vphone");
    let inputvemail = document.getElementById("input-vemail");

    // Get the values from the form fields
    let vendorIDValue = inputvID.value;
    let nameValue = inputvname.value;
    let phoneValue = inputvphone;
    let emailValue = inputvemail;

    // currently the database table for Vendors does not allow updating values to NULL
    // so we must abort if being passed NULL

    if (isNaN(nameValue)) {
        return;
    }
    if (isNaN(phoneValue)) {
        return;
    }
    if (isNaN(emailValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        vid: vendorIDValue,
        vname: nameValue,
        vphone: homeworldValue,
        vemail: emailValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-vendor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, vendorIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, vendorID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("vendor-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == vendorID) {

            // Get the location of the row where we found the matching vendor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let nameCell = updateRowIndex.getElementsByTagName("td")[1];
            let phoneCell = updateRowIndex.getElementsByTagName("td")[2];
            let emailCell = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign attributes to our value we updated to
            nameCell.innerHTML = parsedData[0].name;
            phoneCell.innerHTML = parsedData[0].phone;
            emailCell.innerHTML = parsedData[0].email;

        }
    }
}
