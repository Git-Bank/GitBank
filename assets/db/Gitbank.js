var mysql = require("mysql");
var inquirer = require("inquirer");
var date_fns = require("date-fns")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "gitbank_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // after the connection is made load form for new user info
  promptUserforNewInfo();
});

//  Asks the user for details about their Cash Balance, Income, expenses and login info
//need to get code for form from team
function promptUserforNewInfo() {
    inquirer
        .prompt({

        })
        .then(add2database);
}

