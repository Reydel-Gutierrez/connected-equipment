const express = require("express");
const app = express();
const port = 3100;

app.use(express.json());

var equipments = [
  { id: 1, name: "AHU-1", status: "ON" },
  { id: 2, name: "FCU-2", status: "OFF" },
];

//equipment get method
app.get("/", (req, res) => {
  res.send("Hello Word!");
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

// equipment post method
app.post("/equipment", (req, res) => {
  if (!req.body.name || !req.body.status) {
    res.status(400).json({ error: "Missing Fields" });
    return;
  }

  var new_equipment_id = equipments[equipments.length - 1].id + 1;
  var new_equipment_structure = {
    id: new_equipment_id,
    name: req.body.name,
    status: req.body.status,
  };

  equipments.push(new_equipment_structure);
  res.status(201).json(new_equipment_structure);
});

app.listen(port, () => {
  console.log(`App lisetning on port ${port}`);
});
