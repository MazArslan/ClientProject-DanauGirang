const captureEvents = require("../../../models/CaptureEvent");
const capturedImageModel = require("../../../models/CapturedImage");
const thumbnailImageModel = require("../../../models/ThumbnailImage");
const jimp = require("jimp");
const express = require("express");
const router = express.Router();
const processImages = require("../imageProcessing/processImages");
var fs = require("fs");
const path = require("path");

/*
	This method will create a image thumbnail of an uploaded file
	The inputs of the method is the file, and the directory the file is saved it.
	It will resize and set the quality of the thumbnail, and then will create the thumbnail.
*/
const createThumbnail = async (file, projectPath) => {
  const imageName = file.name.split(".")[0];
  const imageType = file.name.split(".")[1];
  const directory = `${__dirname}/../../../${projectPath}`;
  jimp.read(`${directory}/${file.name}`, (err, image) => {
    image
      .resize(300, 400)
      .quality(60)
      .write(`${directory}/${imageName}_thumbnail.${imageType}`);
  });
  return `${imageName}_thumbnail.${imageType}`;
};

/* 
	/upload POST method
	The directory that the files will be saved to will be created with their project ID.
	The files are then looped through, one by one, and saved to that directory
*/
router.post("/upload", async (req, res) => {
  let projectId = req.body.projectID;
  var projectPath = path.join(process.env.CAMERA_TRAP_RELATIVE_PATH, projectId);
  if (!fs.existsSync(`${__dirname}/../../../${projectPath}`)) {
    fs.mkdirSync(`${__dirname}/../../../${projectPath}`);
  }

  var fileKeys = Object.keys(req.files);
  let captureEventNumbers = [];
  let fileNames = [];
  await fileKeys.forEach(async (key) => {
    let file = req.files[key];
    await file.mv(`${__dirname}/../../../${projectPath}/${file.name}`);

    let thumbnailPath = await createThumbnail(file, projectPath);

    //TODO extract out image metadata
    let captureEvent = new captureEvents();
    captureEvent.projectId = projectId;
    captureEvent.notes = ` `;
    captureEvent.coordinates = "30.001, 20.002";
    captureEvent.isComplete = false;
    captureEvent.createdOnDateTime = new Date();
    captureEvent.save();

    captureEventNumbers.push(captureEvent._id);

    let originalImage = new capturedImageModel();
    originalImage.captureEventId = captureEvent._id;
    originalImage.filePath = `${projectId}/${file.name}`;
    originalImage.save();

    fileNames.push(file.name);

    let thumbnailImage = new thumbnailImageModel();
    thumbnailImage.captureEventId = captureEvent._id;
    thumbnailImage.filePath = `${projectId}/${thumbnailPath}`;
    thumbnailImage.save();
  });
  // Process the images usign the Microsoft MegaDetect AI
  processImages(
    projectPath,
    captureEventNumbers,
    fileNames,
    projectId
  );
  res.end();
});

module.exports = router;
