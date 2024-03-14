/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
as the skeleton code.
*/

function deleteSalesItem(salesItemID) {
    let link = '/delete-sales-item-ajax/';
    let data = {
        salesItemID: salesItemID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(salesItemID);
        }
    });
}

function deleteRow(salesItemID) {
    let table = document.getElementById("sales-item-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == salesItemID) {
            table.deleteRow(i);
            break;
        }
    }
}