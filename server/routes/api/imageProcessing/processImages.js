const axios = require("axios");
const aiImageModel = require("../../../models/AIImage");
const path = require("path");

//post location to the ai server
function processImage(imageLocation, captureIDs, fileNames, projectId) {
  // getting directory of folder and filtering
  let dir = __dirname;
  let index = dir.indexOf("project7-danau-girang/server/");
  let server_dir = dir.slice(0, index + 29);
  let filtered_location = imageLocation.replace("./", server_dir);
  axios
    .post("http://localhost:5000/folder", {
      location: filtered_location,
    })
    .then((res) => {
      // stores the returned json on the database
      let total_of_images = res.data.images.length;
      let images_array = res.data.images;
      // changes location from root dir to project dir on the file.
      for (let i = 0; i < total_of_images; i++) {
        let file = images_array[i].file;
        images_array[i].file = file.replace(server_dir, "./");
      }

      let results = res.data;
      let detections_cat = results.detection_categories;
      let images = results.images;
      let information = results.info;

      for (let j = 0; j < images.length; j++) {
        var file = images[j].file;
        var fileName = path.parse(file).base;
        let indexLocation = fileNames.indexOf(fileName);

        if (indexLocation !== null) {
          let imageObject = {
            captureEventId: captureIDs[indexLocation],
            filePath: `${projectId}/${fileName}`,
            detections: images[j].detections,
            max_detection_conf: images[j].max_detection_conf,
            detection_categories: detections_cat,
            info: information,
            type: "MICROSOFT_AI",
            isCorrect: "",
          };
          let aiImage = new aiImageModel(imageObject);
          aiImage.save();
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return "processComplete";
}

module.exports = processImage;
