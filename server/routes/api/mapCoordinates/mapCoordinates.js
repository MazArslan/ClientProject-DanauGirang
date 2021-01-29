const express = require("express");
const router = express.Router();

const CaptureEvent = require("../../../models/CaptureEvent");

// receive all fields from Capture event model
router.get("/", async (req, res) => {
    CaptureEvent.find()
    .then(coordinates => res.json(coordinates))
    .catch(err => res.status(404).json({ noCoords: 'No Coordinates Found'}));
});

router.get("/:id", async (req, res) => {
    CaptureEvent.findById(req.params.projectId)
    .then(coordinates => res.json(coordinates))
    .catch(err => res.status(404).json({ noCoords: 'No Coordinates Found'}));
});

module.exports = router;