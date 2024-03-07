/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
as the skeleton code.
*/


// Get the objects we need to modify
let updateMenuItemForm = document.getElementById('update-menuItem-form-ajax');

// Modify the objects we need
updateMenuItemForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
  

    // Get form fields we need to get data from
    let inputMenuItemID = document.getElementById("mySelect");
    let inputName = document.getElementById("update-name");
    let inputPrice = document.getElementById("update-price");
    let inputQuanity = document.getElementById("update-quanity");

    // Get the values from the form fields
    let menuItemIDValue = inputMenuItemID.value;
    let nameValue = inputName.value;
    let priceValue = inputPrice.value;
    let quanityValue = inputQuanity.value;


    // Put our data we want to send in a javascript object
    let data = {
        menuItemID: menuItemIDValue,
        name: nameValue,
        listedPrice: priceValue,
        menuItemQuanity: quanityValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-menuItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, menuItemIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, menuItemID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("menuItem-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == menuItemID) {

            // Get the location of the row where we found the matching menuItem ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of attribute values
            let nameCell = updateRowIndex.getElementsByTagName("td")[1];
            let priceCell = updateRowIndex.getElementsByTagName("td")[2];
            let quanityCell = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign attributes to our value we updated to
            nameCell.innerHTML = parsedData[i - 1].name;
            priceCell.innerHTML = parsedData[i - 1].listedPrice;
            quanityCell.innerHTML = parsedData[i - 1].menuItemQuanity;

        }
    }
}