const express = require("express");
const con = require("./db/sql");
const upload = require("express-fileupload");
const app = express();
app.use(upload());
const bodyparser = require("body-parser");

const port = process.env.PORT || 3003;

app.use(bodyparser.json());

app.listen(port, () => {
  console.log("server is open on port" + port);
});

// app.get("/user", (res, req) => {
//   con.query("SELECT * FROM test.student WHERE s_id=1 ", function (
//     err,
//     result,
//     fields
//   ) {
//     if (err) throw err;
//     console.log(result);
//     console.log("hello");
//   });

//   console.log("hey baby");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const fileName = "swastik";
  if (req.files) {
    console.log(req.files);
    const file = req.files.file;
    const filename = "swastik";
    console.log(filename);

    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("file Uploaded");
      }
    });
  }

  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  console.log(date);
  //   /home/aiksstw /
  //     work /
  //     nodeagain /
  //     node_app /
  //     node_with_sql /
  //     src /
  //     uploads /
  //     Swastik_pal_Resume_u.d(1).docx;

  let stmt = `INSERT INTO test.Giix(FileName, path, uploadedOn)
            VALUES(?,?,?)`;
  let todo = [fileName, "swas", date];
  con.query(stmt, todo, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].roll_no);
    console.log("hello");
  });
});
