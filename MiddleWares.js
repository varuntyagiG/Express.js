const express = require("express");
const app = express();

app.listen(8000);

app.get("/", function (req, res) {
  res.send("Home-Route");
});

function kidneyCheckup(req, res, next) {
  let { kidneyId } = req.query;
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(404).json({
      message: "wrong-input",
    });
  } else {
    next();
  }
}

function UserCheckUp(req, res, next) {
  let { username, pass } = req.headers;
  if (!(username == "varun" && pass == "Varu@2004")) {
    res.status(404).json({
      message: "Incorrect-input",
    });
  } else {
    next();
  }
}

let numberOfrequests = 0;
function numberofRequests(req, res, next) {
  numberOfrequests++;
  console.log(numberOfrequests);
  next();
}

app.get(
  "/healthy-check",
  numberofRequests,
  UserCheckUp,
  kidneyCheckup,
  (req, res) => {
    res.send("Check-up");
  },
);
