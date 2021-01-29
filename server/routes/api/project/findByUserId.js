const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

const ProjectModel = require("../../../models/Project");

// API call example: GET http://localhost:3000/api/project/findByUserId?userId=5e63aeef1c9d4400001bb202
router.get("/findByUserId", async (req, res) => {
	const userId = ObjectId(req.query.userId);
	await ProjectModel.find(
		{ users: { $elemMatch: { userId } } },
		{},
		(error, projectsData) => {
			if (error) {
				res.json({ error: true, message: "Error fetching data" });
			} else {
				const response = {
					error: false,
					projects: projectsData
				};
				res.send(response);
			}
		}
	);
});

module.exports = router;
