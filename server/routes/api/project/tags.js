const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

const ProjectModel = require("../../../models/Project");

// API call example: GET http://localhost:3000/api/project/:projectId/tags
router.get("/:projectId/tags", async (req, res) => {
	const projectId = ObjectId(req.params.projectId);
	// Validaiton check
	if (!ObjectId.isValid(projectId)) {
		res.status(404).send("projectId is invalid");
	}
	await ProjectModel.findOne({ _id: projectId }, (error, projectsData) => {
		if (error) {
			res.json({
				error: true,
				message: "Error fetching project data"
			});
		} else {
			const response = {
				error: false,
				projectTags: projectsData.tags
			};
			res.send(response);
		}
	});
});

module.exports = router;
