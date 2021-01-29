const express = require("express");
let projects = express.Router();

const ProjectModel = require("../../../models/Project");
const UserModel = require("../../../models/Users");

/*
	This will return all the projects stored in the database.
*/
projects.get("/getProjects", async (req, res) => {
	ProjectModel.find({}, (err, projects) => {
		if (err) {
			res.send(err);
		} else {
			res.send(projects);
		}
	});
});

/*
	This will return all the users attached to ids stored in a list.
	The return is a list of user objects.
*/
projects.post("/getNames", async (req, res) => {
	let users = [];
	users = req.body.users;
	let arr = [];
	for (let i = 0; i < users.length; i++) {
		const user = await UserModel.findById(users[i].userId);
		arr.push(user);
	}
	res.json(arr);
});

/*
	The route will return the projects attached to a user
	The userId is used to get the projects
*/
projects.post("/getProjectsByUser", async (req, res) => {
	const user = req.body._id;
	const searchQuery = { userId: user };
	const projects = await ProjectModel.find({ users: searchQuery });
	res.json(projects);
});

module.exports = projects;
