var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

//Create user schema and model
const UsersSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true },
		isActive: { type: Boolean, required: true }
	},
	{ timestamps: true }
);

UsersSchema.plugin(uniqueValidator);

//Export schema model
module.exports = mongoose.model("Users", UsersSchema);
