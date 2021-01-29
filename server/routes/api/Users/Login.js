const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

//Secret for JWT token
const secret = require("../../../config.js");

//Require Models
const Users = require("../../../models/Users.js");

//Create router
let UsersApi = express.Router();

//Responds to login request
UsersApi.post("/login", async (req, res) => {
	//Check for user by finding email
	const user = await Users.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send("Email not found");
	}
	//Compare password from request with user
	const checkPass = await bcrypt.compare(req.body.password, user.password);
	if (!checkPass) {
		return res.status(400).send("Invalid Password");
	}

	//Checks if account is active
	const isActive = user.isActive;
	if (!isActive) {
		return res.status(400).send("Account currently inactive");
	}

	//generate token and send to Login.js
	const token = jwt.sign(
		{ _id: user._id, email: user.email, isAdmin: user.isAdmin },
		secret.secret
	);

	res
		.status(201)
		.header("auth-token", token)
		.send({ token: token });
});

module.exports = UsersApi;
