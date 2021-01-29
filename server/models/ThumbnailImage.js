const mongoose = require("mongoose");
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const thumbnailImageSchema = new Schema({
	captureEventId: {
		type: ObjectId,
		required: true,
	},
	filePath: {
		type: String,
		required: true,
	},
});

const thumbnailImageModel = mongoose.model(
	"ThumbnailImage",
	thumbnailImageSchema,
	"thumbnailImages"
);

module.exports = thumbnailImageModel;
