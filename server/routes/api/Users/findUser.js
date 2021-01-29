const express = require("express");
const router = express.Router();

const Users = require("../../../models/Users");

// API call example: GET http://localhost:3000/api/project/findByUserId?userId=5e63aeef1c9d4400001bb202
router.get("/", async (req, res) => {
  await Users.find({}, { _id:1, name: 1})
  .then(users => res.json(users))
  .catch(err => res.status(404).json({ noUsers: 'No Users Found'}));
});

module.exports = router;