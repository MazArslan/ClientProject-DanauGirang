const express = require("express");
const router = express.Router();
const exiftoolBin = require("dist-exiftool");
const exiftool = require("node-exiftool");
const path = require("path");
const ObjectId = require("mongodb").ObjectID;

const CaptureEvent = require("../../../models/CaptureEvent");
const CapturedImage = require("../../../models/CapturedImage");
const AIImage = require("../../../models/AIImage");

// Using pagination, the images for the image card are retrieved
// API call example: GET http://localhost:3000/api/captureEvent/imageCard?cardId=1&projectId=5e6125021c9d440000a4b453
router.get("/:captureEventId/form", async (req, res) => {
  const captureEventId = "" + req.params.captureEventId;

  // ProjectId validation checks
  // RegExp for a string of 24 hex characters
  const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if (captureEventId === null || !captureEventId.match(checkForHexRegExp)) {
    res.status(404).send("captureEventId is invalid");
  }

  let capturedImage = null;
  await CapturedImage.findOne({ captureEventId }, {}, (error, imagesData) => {
    if (error) {
      res.json({
        error: true,
        message: "Error fetching captured image data",
      });
    } else {
      capturedImage = imagesData;
    }
  });

  let aiImages = null;
  await AIImage.find({ captureEventId }, {}, (error, imagesData) => {
    if (error) {
      res.json({ error: true, message: "Error fetching ai image data" });
    } else {
      aiImages = imagesData;
    }
  });

  await CaptureEvent.findOne(
    { _id: captureEventId },
    {},
    (error, captureEventData) => {
      if (error) {
        res.json({ error: true, message: "Error fetching capture event data" });
      } else {
        const response = {
          error: false,
          capturedImage: capturedImage,
          aiImages: aiImages,
          captureEvent: captureEventData,
        };
        res.send(response);
      }
    }
  );
});

router.post("/:captureEventId/form", async (req, res) => {
  const captureEventId = ObjectId(req.params.captureEventId);
  const query = { _id: captureEventId };
  const notes = "" + req.body.notes;
  const tags = req.body.tags;
  const aiCheck = req.body.aiCheck;

  await CaptureEvent.updateOne(
    query,
    { $set: { isComplete: true, notes, tags } },
    (error) => {
      if (error) {
        res.json({
          error: true,
          message: "Error saving data",
        });
      }
    }
  );

  for (let [key, value] of Object.entries(aiCheck)) {
    await AIImage.updateOne(
      { _id: key },
      { $set: { isCorrect: value } },
      (error) => {
        if (error) {
          res.json({
            error: true,
            message: "Error saving data",
          });
        }
      }
    );
  }

  const capturedImage = await CapturedImage.findOne(
    { captureEventId },
    {},
    (error, imageData) => {
      if (error) {
        res.json({
          error: true,
          message: "Error fetching captured image data",
        });
      }
    }
  );

  // Write exif metadata to image
  // Documentation: https://www.npmjs.com/package/node-exiftool
  const basePath = path.join(__dirname, "../../../");
  const fullPath = path.join(
    basePath,
    process.env.CAMERA_TRAP_RELATIVE_PATH,
    capturedImage.filePath
  );
  const epWrite = new exiftool.ExiftoolProcess(exiftoolBin);
  epWrite
    .open()
    .then(() =>
      epWrite.writeMetadata(fullPath, {
        Keywords: tags,
      })
    )
    .then(console.log, console.error)
    .then(() => epWrite.close())
    .catch(console.error);

  res.send({ error: false });
});

module.exports = router;
