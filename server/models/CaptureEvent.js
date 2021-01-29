const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CaptureEventSchema = new Schema({
	projectId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,

		index: true
	},
	notes: {
		type: String,
		required: true
	},
	coordinates: {
		type: String,
		required: true
	},
	isComplete: {
		type: Boolean,
		required: true
	},
	createdOnDateTime: {
		// Mongoose is a bit weird in that it's datetime type is Date
		// See: https://www.oreilly.com/library/view/mongoose-for-application/9781782168195/ch03s02.html
		type: Date,
		required: true
	},
	tags: [
		{
			type: String
		}
	]
});

// Retrieved 23/2/20 https://stackoverflow.com/a/23100950
// Mongoose creates a collection name which is the model name all lowercase and pluralised
// So in this case 'captureevents'
// The third argument in the .model() function allows this convention to be overwritten
const captureEvents = mongoose.model(
	"CaptureEvent",
	CaptureEventSchema,
	"captureEvents"
);

module.exports = captureEvents;
