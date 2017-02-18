var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

function displayMenu() {
    console.log("Menu Options (Manager View):".bold.blue);
    console.log("1.".red + "View Products for Sale".bold);
    console.log("2.".red + "View Low Inventory".bold);
    console.log("3.".red + "Add to Inventory".bold);
    console.log("4.".red + "Add New Product".bold);


var startOrder = function() {

    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function (error, results) 
    {
        // output results into terminal cleanly.
        for (var i = 0; i < results.length; i++) {
            var productID = results[i].id;
            var productName = results[i].product_name;
            var price = results[i].price;
            var productObj = {id: productID, product_name: productName, price: price};

            console.log("Product ID: " + productID + " Product Name: " + productName + " Price: " + price);
        };

        // begin prompt to take order
        inquirer.prompt([{
        type: "input",
        name: "product_id",
        message: "Please enter the product ID you would like to purchase: ",
        validate: function(value) {
                  if (isNaN(value) === false && value > 0 && value < results.length + 1) {
                    return true;
                  } else {
                      return false;
                  }    
              }    
        }, {
        type: "input",
        name: "purchase_quant",
        message: "Quantity you want to purchase: ",
        validate: function(value) {
                  if (isNaN(value) === false && value > 0) {
                    return true;
                  } else {
                      return false;
                }
            }
        }]).then(function(data) {
            var id = data.product_id;
            var quant = data.purchase_quant;
            var item_name = results[id - 1].product_name;
            var item_price = results[id - 1].price;
            var item = {};

            if (results[id - 1].stock_quantity - quant < 0 ) {
                console.log("\nYour order could not be placed. We do not have enough in stock.\n");
                startOrder();
            } else {
                connection.query("UPDATE products SET stock_quantity = (stock_quantity - " + quant + ") WHERE id = " + id, function (error, results) 
                {
                    if (error) {
                        return console.log("There was an error updating the products table.");
                    };
                });

                connection.query("INSERT INTO sales (product_id, quantity_purchased) VALUES (" + id + ", " + quant + ")", function (error, results) 
                {
                    if (error) {
                        return console.log("Error inserting into sales table.");
                    };
                });

                item["item"] = item_name;
                item["price"] = item_price;
                item["quantity"] = quant;

                order.push(item);

                shopMore();
            };
        });
    });
};  