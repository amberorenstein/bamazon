//dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected");
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Make a purchase",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Make a purchase":
          run();
          break;

        case "Exit":
          connection.end();
            break;
      }
    });
}


var run = function()
{connection.query("SELECT * FROM products", function(err,results){
  for(let i = 0; i<results.length; i++) {
    console.log("item id: " + results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity + "\n");
  }
  inquirer
  .prompt([{
    name: "itemId",
    type: "input",
    message: "What is the item ID you would like to buy?",
    validate: function(value) {
      if (isNaN(value) == false) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    name: "Quantity",
    type: "input",
    message: "How many of this item would you like to buy?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      } else {
        return false;
      }
    }
  }]).then(function(answer) {
    var chosenId = answer.itemId - 4;
    var chosenProduct = results[chosenId];
    var chosenQuantity = answer.Quantity;
    var inStock = results[chosenId].stock_quantity;
    if (chosenQuantity < inStock) {
      console.log("Your total for " + "(" + chosenQuantity + ")" + " - " + results[chosenId].product_name + " is: " + results[chosenId].price.toFixed(2) * chosenQuantity);
      connection.query("UPDATE products SET ? WHERE ?",
      [
        {
        stock_quantity: (inStock - chosenQuantity)
      }, {
        item_id: chosenId
      }], function(err, results) {
        // run();
      });
    } else {
      console.log("Sorry, insufficient Quanity at this time. All we have is " + inStock + " in our Inventory.");
      run();
    }
}).catch(function(err){
  console.log(err);
});
});
}

start();
