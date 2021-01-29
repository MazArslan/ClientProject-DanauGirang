const mongoose = require("mongoose");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const CapturedImageSchema = new Schema(
  {
    captureEventId: {
      type: ObjectId,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // We don't need to track document changes for our use case
  }
);

const capturedImageModel = mongoose.model(
  "CapturedImage",
  CapturedImageSchema,
  "capturedImages"
);

module.exports = capturedImageModel;
