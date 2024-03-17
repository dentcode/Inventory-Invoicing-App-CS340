/*
Students: Guibely De Aguinaga and Ignacio De La Cruz
Assignment: CS340 Project
Course: CS340 - Group 39
Code Citations: ALL code sections within this file uses code from
https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
as the skeleton code.
*/

function deleteInvoiceItem(invoiceItemID) {
    let link = '/delete-invoice-item-ajax/';
    let data = {
        invoiceItemID: invoiceItemID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(invoiceItemID);
        }
    });
}

function deleteRow(invoiceItemID) {
    let table = document.getElementById("invoice-item-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == invoiceItemID) {
            table.deleteRow(i);
            deleteDropDownMenu(invoiceItemID);
            break;
        }
    }
}

function deleteDropDownMenu(invoiceItemID) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(invoiceItemID)) {
            selectMenu[i].remove();
            break;
        }

    }
}