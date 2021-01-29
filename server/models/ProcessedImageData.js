const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const detections_sub_schema = new Schema({
    category: {type: Number},
    conf: {type: Number},
    bbox: [{type: Array}],
},{_id: false});

const images_sub_schema = new Schema({
    file: {type: String},
    max_detection_conf: {type: Number},
    detections: [detections_sub_schema]
}, {_id: false});

const detection_categories_sub_schema = new Schema({
    1: {type: String},
    2: {type: String},
    4: {type: String}
}, {_id: false});

const info_sub_schema = new Schema({

    detection_completion_time: {type: Date},
    format_version: {type: String}

}, {_id: false});

const processedImageDataSchema = new Schema({
    images: [images_sub_schema],
    detection_categories: detection_categories_sub_schema,
    info: info_sub_schema
});


const ProcessedImageModel = mongoose.model("processedImages", processedImageDataSchema, "processedImages");

module.exports = ProcessedImageModel;
