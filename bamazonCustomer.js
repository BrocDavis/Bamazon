let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "bamazon_DB"
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

connection.connect(function(err) {
    if (err) throw err;
    displayTable();
  });
mkOrder();
  function mkOrder() {
    inquirer
      .prompt(
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
        })
      .then(function(answer) {
          let item = input.item_id;
          let amount = input.quantity;

          let queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('Error: Invalid Item ID. Select a valid Item ID.');
                displayProducts();

            } else {
                var productData = data[0];

                if (amount <= productData.stock_quantity) {
                    console.log('Good news, the product you want to buy is in stock! Placing order!');

                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQuery, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total comes to $' + productData.price * quantity);
                        console.log("\n-----------------------------------------------------------------------------\n");

                        connection.end();
                    })
                } else {
                    console.log("There's not enough stock. Please check the amount you would like and try to order again.");
                    console.log("\n-------------------------------------");

                    displayTable();
                }
            }
        })
    })
}
  
  function displayTable(){
    queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        var tableStr = '';
        for (var i = 0; i < data.length; i++) {
            tableStr = '';
            tableStr += data[i].item_id + " ";
            tableStr += data[i].product_name + " ";
            tableStr += data[i].department_name + " ";
            tableStr += data[i].price + " ";
            tableStr += data[i].stock_quantity + '\n';

            console.log(tableStr);
        }
    })
  }