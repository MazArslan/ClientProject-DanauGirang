const express = require("express");
const project = express.Router();

const Project = require("../../../models/Project");

// Finds projects from database
project.get("/project", async (req, res) => {
  Project.find()
  .then(projects => res.json(projects))
  .catch(err => res.status(404).json({ noProjects: 'No Users Found'}));
});

//Removes project from database
project.post("/deleteProject", async (req, res) => {
	Project.deleteOne({ _id: req.body._id }, (err, success) => {
		if (err) {
			res.send(err);
		} else {
			res.send(success);
		}
	});
});

//updates project to database
project.post("/updateProject", async (req, res) => {
	Project.findByIdAndUpdate(
		req.body._id,
		{
			name: req.body.name,
        	type: req.body.type,
        	details: req.body.details,
			description: req.body.description,
			tags: req.body.tags
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

project.post("/addProject", async (req, res) => {
    // handle users addition
    let { users = [] } = req.body;
    users = users.map(value => ({ userId: value }));
    console.log(users);
    let newProject = new Project({
        name: req.body.name,
        type: req.body.type,
        users,
        details: req.body.details,
        description: req.body.description,
        tags: req.body.tags
    });

	newProject.save(function(error, newProject) {
		if (error) {
			res.send(error);
		} else {
			res.send(newProject);
		}
	});
});

module.exports = project;