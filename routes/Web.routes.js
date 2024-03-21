// WEB routes
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Web = require("../models/Web.model");

// GET all webs /web/
router.get("/", (req, res) => {
  Web.find()
    .then((webs) => {
      if (webs.length === 0) {
        res.json({ message: 'No webs in there' });
    } else {
        res.json(webs);
    }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET web by id /web/:id
router.get("/:id", (req, res) => {

    const {id} = req.params;

  Web.findById(id)
    .then((web) => res.json(web))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ADD new web /web/add
router.post("/add", async (req, res) => {

  try {
  const { title, description, improvements, implemented, images, category, linkToWeb, linkToCode, languages, createdAt, team } = req.body;

  const newWeb = await Web.create({
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
  res.status(201).json(newWeb);
} catch (error) {
  res.status(400).json({ message: error.message });
} 
});

// UPDATE web by id /web/:id
router.put("/:id", (req, res) => {

  const {id} = req.params;
  const { title, description, improvements, implemented, images, category, linkToWeb, linkToCode, languages, createdAt, team } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Web.findByIdAndUpdate(id, { title, description, improvements, implemented, images, category, linkToWeb, linkToCode, languages, createdAt, team }, { new: true })
    .then((web) => res.json(web))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE web by id /web/:id
router.delete("/:id", (req, res) => {

  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Web.findByIdAndDelete(id)
    .then(() => res.json({ message: 'Web deleted' }))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;