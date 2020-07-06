const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Swastik123@",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Db connection is succeded");
  }
});

module.exports = con;
