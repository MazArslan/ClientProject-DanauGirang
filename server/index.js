const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");

//Use dotenv to read .env vars in project root into Node
require("dotenv").config();

// Initialises the server
const app = express();
const port = process.env.PORT || 3000;

// Attach middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/static", express.static(`./public/images`));
app.use(bodyParser.json()); // Used to make HTTP Post requests

// Mongoose initialisation
mongoose
  .connect(process.env.DATABASE_DEV_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB database connection established"))
  .catch((err) => console.log(err));

// Routes
// Capture Event
const captureEventForm = require("./routes/api/captureEvent/form");
app.use("/api/captureEvent", captureEventForm);
const imageGrid = require("./routes/api/captureEvent/imageGrid");
app.use("/api/captureEvent", imageGrid);
const mapCoordinates = require("./routes/api/mapCoordinates/mapCoordinates");
app.use("/api/mapCoordinates/mapCoordinates", mapCoordinates);

// Image
// Adapted from: https://stackoverflow.com/a/43956895
// Retrieves the image from it's file path, converts into binary to send to the client to be rendered
app.use("/api/images/cameraTrap/:projectId/:imageId", (req, res, next) => {
  const projectId = req.params.projectId;
  const imageId = req.params.imageId;
  var assetsPath = path.join(
    __dirname,
    process.env.CAMERA_TRAP_RELATIVE_PATH,
    projectId,
    "/",
    imageId
  );
  express.static(assetsPath)(req, res, next);
});
//Upload
const upload = require("./routes/api/upload/upload");
app.use("/api/", upload);

// Project
const projects = require("./routes/api/project/projects");
app.use("/api", projects);
const projectTags = require("./routes/api/project/tags");
app.use("/api/project", projectTags);
const projectByUserId = require("./routes/api/project/findByUserId");
app.use("/api/project", projectByUserId);
const projectDetails = require("./routes/api/ProjectDetails/ProjectDetails");
app.use("/api", projectDetails);
//Users
const LoginAPI = require("./routes/api/Users/Login");
app.use("/api", LoginAPI);
//Admin area - users
const users = require("./routes/api/Users/users");
app.use("/api", users);
//User Area - projects
const userDashProjects = require("./routes/api/UserDash/projects");
app.use("/api", userDashProjects);
//Find Users API
const findUsers = require("./routes/api/Users/findUser");
app.use("/api/Users/findUser", findUsers);

app.listen(port, () => console.log(`Server started on port number ${port}`));
