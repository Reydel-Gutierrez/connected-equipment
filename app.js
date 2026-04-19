const express = require("express");
const app = express();
const port = 3100;

var equipments = [
  { id: 1, name: "AHU-1", status: "ON" },
  { id: 2, name: "FCU-2", status: "OFF" },
];

app.get("/", (req, res) => {
  res.json("Hello Word!");
});

app.get("/equipments", (req, res) => {
  res.json(equipments);
});

app.get("/equipment/:id", (req, res) => {
  for (let index = 0; index < equipments.length; index++) {
    if (equipments[index].id == req.params.id) {
      res.json(equipments[index]);
      return;
    }
  }
  res.status(404).json({ error: "Equipment not found" });
});

app.listen(port, () => {
  console.log(`App lisetning on port ${port}`);
});
