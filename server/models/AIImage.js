const mongoose = require("mongoose");
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const detections_sub_schema = new Schema({
	category: {type: Number},
	conf: {type: Number},
	bbox: [{type: Array}],
},{_id: false});

const detection_categories_sub_schema = new Schema({
    1: {type: String},
    2: {type: String},
    4: {type: String}
}, {_id: false});

const info_sub_schema = new Schema({

    detection_completion_time: {type: Date},
    format_version: {type: String}

}, {_id: false});

const AIImageSchema = new Schema({
	captureEventId: {
		type: ObjectId,
		required: true
	},
	filePath: {
		type: String,
		required: true
	},
	detections: [detections_sub_schema],
	max_detection_conf: {type: Number},
	detection_categories: detection_categories_sub_schema,
	info: info_sub_schema,
	type: { 
		type: String,
		required: true
	},
	isCorrect: {
		type: String
	}
});

const aiImageModel = mongoose.model("AIImage", AIImageSchema, "aiImages");

module.exports = aiImageModel;
