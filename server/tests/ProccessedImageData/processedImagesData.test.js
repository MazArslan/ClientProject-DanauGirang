const dbHandler = require("../db-handler");
const ProcessedImageModel = require("../../models/ProcessedImageData");

const processedImage = require("./json_resources/processedimage.json");

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());
// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());
// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("User Model Test ", () => {
    it("can be created correctly", async () => {
        // Create model of ProcessedImageJSON
        const ProcessedImageEvent = new ProcessedImageModel(processedImage);

        // Save model
        const savedImage = await ProcessedImageEvent.save();

        //Check it saves correctly
        expect(savedImage.images).toBeDefined();
        expect(savedImage.images.file).toBe(processedImage.images.file);
        expect(savedImage.images.max_detection_conf).toBe(processedImage.images.max_detection_conf);
        expect(savedImage.images.detections).toBe(processedImage.images.detections);


        expect(savedImage.detection_categories).toBeDefined();

        expect(savedImage.info).toBeDefined();
        expect(savedImage.info.format_version).toBe(processedImage.info.format_version);
        expect(Date.parse(savedImage.info.detection_completion_time)).toBe(Date.parse(processedImage.info.detection_completion_time));

    });
});
