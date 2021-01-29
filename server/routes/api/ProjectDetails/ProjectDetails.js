const express = require("express");
const ProjectDetails = express.Router();

const ProjectModel = require("../../../models/Project");
const UserModel = require("../../../models/Users");
const CaptureEvents = require("../../../models/CaptureEvent");
const AIImage = require("../../../models/AIImage");

ProjectDetails.get("/getProject", async (req, res) => {
  await ProjectModel.findById(req.query._id, (err, project) => {
    if (err) {
      console.log(err);
    } else {
      res.json(project);
    }
  });
});

/**
 * This route will get all the necessary information to
 * fill in the stat cards on a projects page
 **/
ProjectDetails.get("/getStats", async (req, res) => {
  const projectID = req.query.projectID;
  let eventArray = [];
  eventArray = await CaptureEvents.find({ projectId: projectID });
  let numberOfEvents = 0;
  //Card 1
  numberOfEvents = eventArray.length;

  //Card 2
  let numberOfDetections = 0;
  for (let i = 0; i < eventArray.length; i++) {
    let currentID = eventArray[i]._id;
    let imageArray = [];
    imageArray = await AIImage.find({ captureEventId: currentID });
    for (let j = 0; j < imageArray.length; j++) {
      let numOfDetectionsInImage = imageArray[j].detections.length;
      numberOfDetections += numOfDetectionsInImage;
    }
  }

  //Card 3
  let numberCompleted = 0;
  eventArray.forEach((event) => {
    if (event.isComplete) {
      numberCompleted += 1;
    }
  });

  res.json({ numberOfEvents, numberOfDetections, numberCompleted });
  res.end();
});

ProjectDetails.get("/getProject", async (req, res) => {
  await ProjectModel.findById(req.query._id, (err, project) => {
    if (err) {
      console.log(err);
    } else {
      res.json(project);
    }
  });
});

/**
 * This route will get all the necessary information to
 * fill in the stat cards on a projects page
 **/
ProjectDetails.get("/getadStats", async (req, res) => {
  let eventArray = [];
  // number of capture events
  eventArray = await CaptureEvents.find();
  let numberOfEvents = 0;
  //Card 1
  // find length of capture events
  numberOfEvents = eventArray.length;

  //Card 2
  //
  let numberOfDetections = 0;
  for (let i = 0; i < eventArray.length; i++) {
    let currentID = eventArray[i];
    let imageArray = [];
    imageArray = await AIImage.find({ captureEventId: currentID });
    for (let j = 0; j < imageArray.length; j++) {
      let numOfDetectionsInImage = imageArray[j].detections.length;
      numberOfDetections += numOfDetectionsInImage;
    }
  }

  //Card 3
  let numberCompleted = 0;
  eventArray.forEach((event) => {
    if (event.isComplete) {
      numberCompleted += 1;
    }
  });

  // AI confidence
  let aiConfidenceMax = 0;
  // calculate total max confidence
  // aggregate function
  aiConfidenceMax = await AIImage.aggregate([
    {
      $group: {
        _id: null,
        max_detection_conf: { $avg: "$max_detection_conf" },
      },
    },
    {
      $project: {
        _id: 0,
        max_detection_conf: "$max_detection_conf",
      },
    },
  ]);
  console.log(aiConfidenceMax);
  res.json({
    numberOfEvents,
    numberOfDetections,
    numberCompleted,
    aiConfidenceMax,
  });
  res.end();
});

ProjectDetails.get("/getProjectUsers", async (req, res) => {
  const users = req.query.users;
  console.log(users);
  let arr = [];
  for (let i = 0; i < users.length; i++) {
    const user = await UserModel.findById(users[i].userId);
    arr.push(user);
  }
  res.json(arr);
});

module.exports = ProjectDetails;
