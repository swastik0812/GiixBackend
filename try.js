console.log("hy");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Swastik123@",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
});

con.query("SELECT * FROM test.student WHERE s_id=1 ", function (
  err,
  result,
  fields
) {
  if (err) throw err;
  console.log(result[0].roll_no);
  console.log("hello");
});


