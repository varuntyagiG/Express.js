const express = require("express");
const app = express();
const cors = require("cors");

let port = 3000;

app.listen(port);

app.use(cors());

function calculate(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

app.get("/xyz", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  const sum = a + b;
  console.log(sum);
  res.send(sum.toString());
});

app.get("/", (req, res) => {
  let { n } = req.query;
  let ans = calculate(n);
  res.send("Your answer is " + ans);
});

app.post("/post", (req, res) => {
  console.log(req.headers);
  res.send("this is post methoud");
});
