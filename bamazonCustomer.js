let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
});

function inputCheck(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter value higher than zero';
    }
}

function mkOrder() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'item_id',
                message: 'Enter the Item ID of what you would like to buy.',
                validate: inputCheck,
                filter: Number
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like?',
                validate: inputCheck,
                filter: Number
            }])
        .then(function (answer) {
            let item = answer.item_id;
            let amount = answer.quantity;

            let queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function (err, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log('Please select a valid Item ID.');
                    displayTable();

                } else {
                    var productData = data[0];

                    if (amount <= productData.stock_quantity) {

                        let updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - amount) + ' WHERE item_id = ' + item;

                        connection.query(updateQuery, function (err, data) {
                            if (err) throw err;

                            console.log('Your total comes to $' + productData.price * amount);

                            connection.end();


                        })
                    } else {
                        console.log("There's not enough stock. Please check the amount you would like and try to order again.");

                        displayTable();

                    }
                }
            })
        })
}

function displayTable() {
    queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function (err, data) {
        if (err) throw err;
        console.log('Stock: ');
        var tableStr = '';
        for (var i = 0; i < data.length; i++) {
            tableStr = '';
            tableStr += data[i].item_id + " ";
            tableStr += data[i].product_name + " ";
            tableStr += data[i].department_name + " ";
            tableStr += "price: " + data[i].price + " ";
            tableStr += "quantity: " + data[i].stock_quantity;

            console.log(tableStr);
        }
        mkOrder();
    })

}
//display table calls mkOrder to start the app
displayTable();


