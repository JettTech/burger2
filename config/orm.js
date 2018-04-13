
//ROLE OF THE ORM (Object Relational Mapping) FILE
// =====================================================================================
//THE ORM === THE CONVERTER, ITS PURPOSE === is to write the functions into which inputs and conditions are passed
//in a way that turns the input/conditions into Database commands like SQL


// The Requires
// =====================================================================================
var connection = require("./connection.js");

// Global Functions
// =====================================================================================
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  delete: function(table, objColumnValues, condition, callback) {
    var queryString = "DELETE FROM " + table;

    queryString += "SELECT "; //MAKE SURE this is the right QUEREY (/action) choice!
    queryString += objToSQL(objColumnValues);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString); //for NODE viewing...
    connection.query(queryString, function(error, result) {
      if (error) throw error;

      callback (result);
    });
  }
};

module.exports = orm;