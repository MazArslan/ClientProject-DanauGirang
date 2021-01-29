const express = require("express");
const router = express.Router();

const Project = require("../../../models/Project");
const CaptureEvent = require("../../../models/CaptureEvent");
const ThumbnailImage = require("../../../models/ThumbnailImage");

// Server-side pagination
// API call example: GET http://localhost:3000/api/captureEvent/imageGrid?pageNo=1&projectId=5e6125021c9d440000a4b453
router.get("/imageGrid", async (req, res) => {
  // Retrieved 23/2/20 Pagination logic adapted from: https://codeforgeek.com/server-side-pagination-using-node-and-mongo/
  const pageNo = parseInt(req.query.pageNo);
  const completionStatus = req.query.completionStatus;
  const createdOnDate = req.query.createdOnDate;
  const projectId = req.query.projectId;
  const pageSize = req.query.pageSize;

  // ProjectId validation checks
  // RegExp for a string of 24 hex characters
  const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  if (projectId === null || !projectId.match(checkForHexRegExp)) {
    res.status(404).send("ProjectId is invalid");
  }

  let queryOptions = {}; // Builds query for pagination
  if (pageNo < 0 || pageNo === 0) {
    const response = { error: true, message: "Invalid page number" };
    return res.json(response);
  }
  queryOptions.skip = pageSize * (pageNo - 1);
  queryOptions.limit = parseInt(pageSize);
  // Filter to return events that have or have not been processed
  // else had no filter applied
  let query = { projectId };
  if (completionStatus === "complete") {
    query.isComplete = true;
  } else if (completionStatus === "incomplete") {
    query.isComplete = false;
  }

  if (createdOnDate) {
    // Date validation check
    if (
      new Date(createdOnDate) === "Invalid Date" ||
      isNaN(new Date(createdOnDate))
    ) {
      res.status(404).send("Date is invalid");
    }
    // Adapted from: https://stackoverflow.com/a/26387279
    // Query for a specific date Has to be two values when querying for a date
    // So set the time period for that date
    const morningDate = new Date(createdOnDate);
    morningDate.setSeconds(0);
    morningDate.setMinutes(0);
    morningDate.setHours(0);

    const dateMidnight = new Date(morningDate);
    dateMidnight.setSeconds(59);
    dateMidnight.setMinutes(59);
    dateMidnight.setHours(23);
    query.createdOnDateTime = { $gt: morningDate, $lt: dateMidnight };
  }

  // Calculates the number of capture events for the given projectId
  const numberOfEvents = await CaptureEvent.countDocuments(query);
  //Calculates the total number of pages
  const calcPages = Math.ceil(numberOfEvents / pageSize);
  //Returns an array of catpure events for a given projectId
  let capturedEvents = await CaptureEvent.find(query, {}, queryOptions);
  // Converts the capture event objects to mongoose objects
  capturedEvents = capturedEvents.map((event) => event.toObject());
  // Retrieves the thumbnail images associated with the capture event
  capturedEvents = await Promise.all(
    capturedEvents.map(async (captureEvent) => {
      captureEvent.thumbnailImage = await ThumbnailImage.findOne({
        captureEventId: captureEvent._id,
      });
      return captureEvent;
    })
  );

  let currentProject = await Project.findOne({ _id: projectId }, {});

  // Builds the API response
  const response = {
    error: false,
    captureEvents: capturedEvents,
    totalPages: calcPages,
    totalCaptureEvents: numberOfEvents,
    project: { name: currentProject.name, tags: currentProject.tags },
  };
  res.send(response);
});

module.exports = router;
