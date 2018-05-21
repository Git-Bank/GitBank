var mysql = require("mysql");
var date_fns = require("date-fns");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Newmoney00$",
  database: "gitbank_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // after the connection is made load cashflow data from user
//   displayCashFlow();
console.log("You're connected to the Git Bank Database as id " + connection.threadId);
pullBalance();
pullIncome();
pullExpenses();
});

//----------- need to create code that pulls only the information for each unique customer -----------------------------------
var customerUniqueID = 1;

// creates a new date object with the current date and time
var today = new Date();
var month = today.getMonth();
console.log("The Date is " + today);
console.log("The month is " + month);

// create beginning balance variable from SQL database
function  pullBalance(){
    connection.query("SELECT Beg_Balance FROM balance WHERE Unique_id= '"+customerUniqueID+"'", function(err,results) {
        if (err) throw err;
        console.log("Your beginning balance for the week is " + (results[0].Beg_Balance));
        var begBalance = 0;
        begBalance = results[0].Beg_Balance;
    });
}



// Create income variable from SQL database
function  pullIncome(){
    connection.query("SELECT income_Value, income_Frequency, Income_Paydate FROM income WHERE Unique_id='"+customerUniqueID+"'", function(err,results) {
        if (err) throw err;
        console.log("Your income is " + (results[0].income_Value) + " and you get paid on day " + (results[0].Income_Paydate) + " of the month");
        var income = 0;
        
        results.forEach(function(week){
            var current = week;
            var thisWeek = date_fns.isThisWeek(date_fns.setDate(today, current.Income_Paydate));
            if(current.income_Frequency === 'Weekly') {
                income += current.income_Value;
            }

            if(current.income_Frequency === 'biweekly' && thisWeek) {
                income += current.income_Value;
            }
            console.log("This week your income is " + income);
            console.log("Is income this week? " + thisWeek);
        });
        return income;
    });
}

var income = pullIncome();
console.log("This is income variable" + income);

//create a variable for this weeks expenses

var allExpenses = 0;

function pullExpenses(){
    connection.query("SELECT Expense_Name, Expense_Value, Expense_Frequency, Expense_Paydate FROM expenses WHERE Unique_id='"+customerUniqueID+"'", function(err,results) {
        if (err) throw err;
        var acc = 0;

        results.forEach(function(week){
            var current = week;
            var thisWeek = date_fns.isThisWeek(date_fns.setDate(today, current.Expense_Paydate));
            if (current.Expense_Frequency === 'Weekly') {
                acc += current.Expense_Value;
            }

            if (current.Expense_Frequency === 'biweekly' && thisWeek) {
                acc += current.Expense_Value;
            }

            if (current.Expense_Frequency === 'Monthly' && thisWeek) {
                acc += current.Expense_Value;
            }
            console.log("You have weekly expenses of "+ acc);
        });
            
            return acc;
    });
}

