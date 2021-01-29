const dbHandler = require("../db-handler");
const ObjectId = require("mongodb").ObjectID;
const ImageModel = require("../../models/CapturedImage");
const imageDataSet1 = {
	captureEventId: "5e6125021c9d440000a4b438",
	filePath: "ORw0KGgoAAAANSUhEUgAAAlMAAAGKCAMAAAAfBMVEUZGhIdHBYcHBMg"
};
const imageDataSet2 = {
	captureEventId: "5e6125021c9d440000a4a911",
	filePath: "ORw0XGgoAABBNSUhNTgBBAlMAAAGKCAMAAAAfBMVEUZGhIdHBYcKBMg"
};

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("Image Model Test ", () => {
	it("can be created correctly", async () => {
		// Given
		const validImage = new ImageModel(imageDataSet1);
		// When
		const savedImage = await validImage.save();
		// Then
		expect(savedImage._id).toBeDefined();
		expect(savedImage.captureEventId.toString()).toBe(
			imageDataSet1.captureEventId
		);
		expect(savedImage.imageFile).toBe(imageDataSet1.imageFile);
		expect(savedImage.contentType).toBe(imageDataSet1.contentType);
		expect(savedImage.type).toBe(imageDataSet1.type);
	});
});

describe("Find by captureEventId", () => {
	it("can find a image by a given captureEventId", async () => {
		// Given
		// Image data sets have different captureEventIds
		const Image1 = new ImageModel(imageDataSet1);
		const Image2 = new ImageModel(imageDataSet2);
		const captureEventId = ObjectId("5e6125021c9d440000a4a911");
		await Image1.save();
		await Image2.save();
		// When
		const allImages = await ImageModel.find({}, {});
		const foundImage = await ImageModel.find({ captureEventId }, {});
		// Then
		// Check that two images are added to the database
		expect(allImages.length).toEqual(2);
		// Check that the filtered final call contains only one object
		expect(foundImage.length).toEqual(1);
		// Check the content of the object
		expect(foundImage[0].captureEventId).toEqual(captureEventId);
	});
});
