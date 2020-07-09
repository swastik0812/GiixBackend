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
      let j = 1;
      for (let i = dataArray.length - 1; i >= 1 && j <= 10; i--, j++) {
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
  fileFilter(req, file, cb) {
    //using regex here
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload the file only in jpg/jpeg/png"));
    }
    cb(undefined, true);
  },
});
// buffer
router.post(
  "/",
  upload.single("uploads"),
  (req, res) => {
    let fileName = req.file.filename;
    console.log("guied" + fileName);
    const date = new Date();
    let path =
      "/home/swastik/work/nodeagain/node_app/node_with_sql/src/uploads";
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
  },
  (error, req, res, next) => {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
);

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
