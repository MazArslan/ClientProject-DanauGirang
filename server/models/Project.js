const mongoose = require("mongoose");
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// Stop mongoose from adding an _id property for sub-document array items
// https://intellipaat.com/community/29428/stop-mongoose-from-creating-id-property-for-sub-document-array-items
const usersSubSchema = mongoose.Schema({ userId: ObjectId }, { _id: false });

const ProjectSchema = new Schema({
	type: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	tags: [
		{
			type: String,
		}
	],
	users: [usersSubSchema]
});

const projectModel = mongoose.model("Projects", ProjectSchema, "projects");

module.exports = projectModel;
