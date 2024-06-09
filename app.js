const express = require("express");
const app = express();

app.use(express.json());

app.listen(8080);

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

// get request is used show the data
app.get("/", (req, res) => {
  let totalnoofkidneys = user[0].kidneys.length;
  let totalnoofhealthykidneys = 0;
  for (let i = 0; i < totalnoofkidneys; i++) {
    if (user[0].kidneys[i].healthy === true) {
      totalnoofhealthykidneys = totalnoofhealthykidneys + 1;
    }
  }
  let totalnoofunhealthykidney = totalnoofkidneys - totalnoofhealthykidneys;
  res.json({
    totalnoofkidneys,
    totalnoofhealthykidneys,
    totalnoofunhealthykidney,
  });
});

// Post request is used to add data
app.post("/", (req, res) => {
  const { isHealthy } = req.body;
  console.log(isHealthy);
  user[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send("Done!");
});

// put request to upgrade data
app.put("/", (req, res) => {
  for (let i = 0; i < user[0].kidneys.length; i++) {
    user[0].kidneys[i].healthy = true;
  }
  res.send("Done");
});

// remove all the unhealthy kidneys
app.delete("/", (req, res) => {
  let newKidneys = [];
  for (let i = 0; i < user[0].kidneys.length; i++) {
    if (user[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
    user[0].kidneys = newKidneys;
    res.send("Delete Req. work");
  }
});
