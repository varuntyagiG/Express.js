const express = require("express");
const app = express();

let port = 8080;

app.use(express.json());

app.listen(port);

const user = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const johnKidneys = user[0].kidneys;
  const numberOfkidneys = johnKidneys.length;
  let numberofhealthyKidney = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberofhealthyKidney = numberofhealthyKidney + 1;
    }
    const numberofunhealthykidney = numberOfkidneys - numberofhealthyKidney;
    res.json({
      numberOfkidneys,
      numberofhealthyKidney,
      numberofunhealthykidney,
    });
  }
});

app.post("/", (req, res) => {
  const { isHealthy } = req.body;
  console.log(isHealthy);
  user[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send("we push an isHealthy kidney in user through req.body from postman");
});
