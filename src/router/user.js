const express = require("express");
const con = require("../db/sql");

const router = express.Router();

router.get("/files", (req, res) => {
  con.query("SELECT * FROM test.userFile ", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log("hello");
  });
});

router.post("/", (req, res) => {
  let fileName = "";
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  date.toString();
  let path = "/home/work/nodeagain/node_app/node_with_sql/src/uploads/";

  if (req.files) {
    console.log(req.files);
    const file = req.files.file;
    fileName = file.name;
    console.log(fileName);

    file.mv("./uploads/" + fileName, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("file Uploaded");
      }
    });
  }
  const finalPath = path.concat(fileName);
  let stmt = `INSERT INTO test.userFile(path, FileName, uploadedOn)
              VALUES(?,?,?)`;
  let todo = [finalPath, fileName, date];
  con.query(stmt, todo, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);
    console.log("hello");
  });
});

module.exports = router;
