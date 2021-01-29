const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../../../models/Users");

const users = express.Router();

//Finds all users
users.get("/user", async (req, res) => {
	UserModel.find({ isAdmin: false }, (err, users) => {
		if (err) {
			console.log(err);
			return err;
		} else {
			res.send(users);
			return users;
		}
	});
});

//Adds user to the database - hashes password
users.post("/addUser", async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	let newUser = new UserModel({
		name: req.body.name,
		email: req.body.email,
		password: hashedPass,
		isAdmin: req.body.isAdmin,
		isActive: req.body.isActive,
	});

	newUser.save(function(err, newUser) {
		if (err) {
			res.send(err);
		} else {
			res.send(newUser);
		}
	});
});

//Removes user from database using ID from API call
users.post("/deleteUser", async (req, res) => {
	UserModel.deleteOne({ _id: req.body._id }, (err, success) => {
		if (err) {
			res.send(err);
		} else {
			res.send(success);
		}
	});
});

users.post("/updateUser", async (req, res) => {
	UserModel.findByIdAndUpdate(
		req.body._id,
		{
			name: req.body.name,
			email: req.body.email,
			isAdmin: req.body.isAdmin,
			isActive: req.body.isActive,
		},
		(err, sucess) => {
			if (err) {
				res.send(err);
			} else {
				res.send(sucess);
			}
		}
	);
});

module.exports = users;
