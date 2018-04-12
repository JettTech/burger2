
//ROLE OF THE ORM (Object Relational Mapping) FILE
// =====================================================================================
//THE ORM === THE CONVERTER, ITS PURPOSE === is to write the functions into which inputs and conditions are passed
//in a way that turns the input/conditions into Database commands like SQL


// The Requires
// =====================================================================================
var connection = require("./connection.js");

// Global Functions
// =====================================================================================
function printQuestionMark(number) {
  var arrayQuestionMark = [];

  for (var i = 0; i < number; i++) {
    arrayQuestionMark.push("?"); //this will allow that (for ever num exisiting/pushed through), 
    //there is an option to call it. "?" reference an option/non-mandatory
    // query to be added to the query filter && action.
  }
  return arrayQuestionMark.toString(); //Transfroms the list of nums in the array INTO a Strings  
}

function objToSQL(object) {
  var arrayIndexValue = [];

  for (var x in object) {
    arrayIndexValue.push(x + " = " + object[x]); //this will push the index AND the value of that index from the object >>> together into the above Array.
  }
  return arrayIndexValue.toString();
}

// The ORM Logic: Where inputs (through functions) output SQL Queries/Actions..
// ====================================== ===============================================
var orm = {
  all: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";"; //MAKE SURE TO INCLUDE THE "SPACE " IN BETWEEN THE NED OF THE SQL COMMAND and the table/query data, otherwise, the system cannot read the table (correctly), and will generage an error...
    
    connection.query(queryString, function(error, result) {
      if(error) throw error;
      callback(result); //this should console.log(/print out) all the logged items in the provided table(which in this case should the "burgers" table);
    });
  }, // !! MAKE SURE THIS IS A COMMA, NOT a semi-colon !!

  create: function(table, columns, values, callback) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMark(values.length);
    queryString += ") ";

    console.log(queryString); //for NODE viewing...
    connection.query(queryString, values, function(error, result) {
      if (error) throw error;
      callback (result);
    });
  },  // !! MAKE SURE THIS IS A COMMA, NOT a semi-colon !!

  update: function(table, objColumnValues, condition, callback) {
    var queryString = "UPDATE " + table;

    queryString += "SET";
    queryString += objToSQL(objColumnValues);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString); //for NODE viewing...
    connection.query(queryString, function(error, result) {
      if (error) throw error;
      callback (result);
    });
  },  // !! MAKE SURE THIS IS A COMMA, NOT a semi-colon !!

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

