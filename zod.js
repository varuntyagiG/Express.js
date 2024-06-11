const express = require("express");
const zod = require("zod");
const app = express();

const schema = zod.array(zod.number());

app.use(express.json());

app.post("/healthy-check", (req, res) => {
  const { kidneys } = req.body;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    throw new Error("Wrong-input");
  } else {
    res.json({
      response,
    });
  }
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: "Some-Error Occured",
  });
});

app.listen(8888);
