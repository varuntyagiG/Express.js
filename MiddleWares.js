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

app.use(express.json());
app.use(numberofRequests); // app.use => work in each-route which is define after this-

let wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};

app.get("/healthy-check", UserCheckUp, kidneyCheckup, (req, res) => {
  res.send("Check-up");
});

// kidneyCheckup do not work in this route
app.post(
  "/heart-check",
  UserCheckUp,
  wrapAsync((req, res) => {
    let { kidneys } = req.body;
    let kidneyslength = kidneys.length;
    res.send("no of kidneys in your body" + kidneyslength);
  }),
);

// error handlor
app.use((err, req, res, next) => {
  res.status(500).json({
    mssge: "something went wrong",
  });
});
