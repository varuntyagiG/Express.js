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

// to calculate sum
app.get("/xyz", (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  const sum = a + b;
  console.log(sum);
  res.send(sum.toString());
});

// to calculate simple interest
app.get("/simpleinterest", function (req, res) {
  let P = parseInt(req.query.p);
  let R = parseInt(req.query.r);
  let T = parseInt(req.query.t);
  let SI = (P * R * T) / 100;
  console.log(SI);
  res.send(`The Simple interset is: ${SI.toString()}`);
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
