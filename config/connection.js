var mysql = require("mysql");

var connection;

if(process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Batman123",
		database: "burgers_db"
	});
}

connection.connect(function(err) {
  if (err) {
  	return console.error("error connecting: " + err.stack);
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;


// {
//   "development": {
//     "username": "root",
//     "password": "Batman123",
//     "database": "ice_breaker",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "t2roilq6c8pbokiw",
//     "password": "lu3l97birqkxxt5k",
//     "database": "fh7alhrpiz31lrls",
//     "host": "hngomrlb3vfq3jcr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//     "dialect": "mysql"
//   }
// }