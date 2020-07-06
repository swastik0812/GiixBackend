const express = require("express");
const con = require("../db/sql");
const multer = require("multer");

const router = express.Router();

router.get("/files", (req, res) => {
  try {
    let response = [];
    con.query("SELECT * FROM test.Giix ", function (err, result, fields) {
      if (err) throw err;
      const dataArray = Object.keys(result).map((data) => {
        return result[data];
      });
      for (let i = dataArray.length < 10 ? dataArray.length : 10; i >= 1; i--) {
        response.push(dataArray[i]);
      }
      res.send(response);
    });
  } catch (e) {
    res.send(e);
  }
});

const upload = multer({
  dest: "uploads",
});

router.post("/", upload.single("uploads"), (req, res) => {
  let fileName = req.file.filename;
  const date = new Date();
  let path = "/home/work/nodeagain/node_app/node_with_sql/src/uploads/";
  filename = req.file.filename;
  if (req.file) {
    const finalPath = path.concat(fileName);
    let stmt = `INSERT INTO test.Giix(path, FileName, uploadedOn)
              VALUES(?,?,?)`;
    let todo = [finalPath, fileName, date];
    con.query(stmt, todo, function (err, result, fields) {
      if (err) throw err;
    });
  }
  res.send();
});

router.post("/updateName", async (req, res) => {
  let data = [req.body.name, req.body.id];
  await con.query(
    "UPDATE test.Giix SET name=? WHERE _id=?",
    data,
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
