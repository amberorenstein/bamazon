//dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({host: "localhost", port: 3306, user: "root", password: "", database: "bamazon_db"})
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err)
  throw err;
  console.log("connected");
  makeTable();
})

var makeTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log("item id: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
    }
    promptCustomer(res);
  })
}
  var promptCustomer = function(res) {
    inquirer.prompt([{
      type: 'input',
      name: 'choice',
      message: 'What would you like to buy today? [Enter X to exit]'
    }]).then(function(answer){
      var correct = false;
      if(answer.choice.toUpperCase()=="X"){
        process.exit();
      }
      for (var i=0; i<res.length; i++){
        if(res[i].product_name == answer.choice){
          correct=true;
          var product = answer.choice;
          var id = i;
          inquirer.prompt({
            type: "input",
            name: "quant",
            message: "How many would you like to buy?",
            validate: function(value){
              if(isNaN(value)==false){
                return true;
              } else {
                return false;
              }
            }
          }).then(function(answer){
            if((res[id].stock_quantity-answer.quant)>0){
              connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quant)+"' WHERE product_name= '"+product+"'", function(err, res2){
                console.log("Purchased!");
                makeTable();
              })
            } else {
              console.log("Invalid selection");
              promptCustomer(res);
            }
          })
        }
      }
      if(i == res.length && correct == false){
        console.log("Invalid selection");
        promptCustomer(res);
      }
    })
  }
