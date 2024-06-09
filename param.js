const express = require("express");
const fs = require("fs");
const app = express();

app.listen(3001);

// params
app.get("/file/:filename", (req, res) => {
  let { filename } = req.params;
  fs.readFile(filename, "utf-8", (err, data) => {
    res.json({
      data,
    });
  });
});
