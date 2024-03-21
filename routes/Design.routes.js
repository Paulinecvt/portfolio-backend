// DESIGN routes
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Design = require("../models/Design.model");

// GET all designs /design/
router.get("/", (req, res) => {
  Design.find()
    .then((designs) => {
      if (designs.length === 0) {
        res.json({ message: 'No designs in there' });
    } else {
        res.json(designs);
    }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET design by id /design/:id
router.get("/:id", (req, res) => {
  Design.findById(req.params.id)
    .then((design) => res.json(design))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ADD new design /design/add
router.post("/add", async (req, res) => {

  try {
  const { title, description, improvements, implemented, images, category, linkToWeb, linkToCode, languages, createdAt, team } = req.body;

  const newDesign = await Design.create({
    title,
    description,
    improvements,
    implemented,
    images,
    category,
    linkToWeb,
    linkToCode,
    languages,
    createdAt,
    team
  });
  res.status(201).json(newDesign);
} catch (error) {
  res.status(400).json({ message: error.message });
} 
});

// UPDATE design by id /design/:id
router.put("/:id", (req, res) => {

  const {id} = req.params;
  const { title, description, improvements, implemented, images, category, linkToWeb, linkToCode, languages, createdAt, team } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
}

Design.findById(id)
    .then((design) => {
      if (!design) {
        return res.status(404).json({ message: 'design not found' });
    } else {
  Design.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedDesign) => {
      res.status(200).json(updatedDesign)
      console.log('design updated')
      })
    .catch((err) => res.status(400).json("Error: " + err));
  }
}
);
});

// DELETE design by id /design/:id
router.delete("/:id", (req, res) => {

  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
}

  Design.findByIdAndDelete(id)
    .then(() => res.json("Design deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
