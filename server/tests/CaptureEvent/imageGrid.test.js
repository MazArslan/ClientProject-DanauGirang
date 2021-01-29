const dbHandler = require("../db-handler");
const CaptureEventModel = require("../../models/CaptureEvent");
const ImageModel = require("../../models/CapturedImage");
const ObjectId = require("mongodb").ObjectID;
const projectId = ObjectId("5e6125021c9d440000a4b679");
const captureEventDataSet1 = {
	projectId: projectId,
	notes: "Interesting animals in picture :)",
	coordinates: "Lat: 28.59202, Long: -99.03434",
	createdOnDateTime: "2020-03-25T01:00:00.000+00:00",
	isComplete: true
};
const captureEventDataSet2 = {
	projectId: projectId,
	notes: "No animals in picture :(",
	coordinates: "Lat: 26.59204, Long: -99.03137",
	createdOnDateTime: "2020-03-24T01:00:00.000+00:00",
	isComplete: true
};
const captureEventDataSet3 = {
	projectId: projectId,
	notes: "Some animals in picture",
	coordinates: "Lat: 37.59204, Long: -99.03137",
	createdOnDateTime: "2020-03-24T01:00:00.000+00:00",
	isComplete: true
};
const imageDataSet1 = {
	filePath: "ORw0KGgoAAAANSUhEUgAAAlMAAAGKCAMAAAAfBMVEUZGhIdHBYcHBMg"
};
const imageDataSet2 = {
	filePath: "ORw0KGgoAAAANSUhEUgABBlMBBAGKCBGAAAAfBMVEUZGhIdHBYcHBMg"
};
const imageDataSet3 = {
	filePath: "ORw0KGgoAAAANSUhEUgAAAlMAAAGKCAMAABBfBMVEUZGhIdHBYcHBKg"
};

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("ImageGrid API test", () => {
	it("can calculate the number of pages of data", async () => {
		// Given
		const CaptureData1 = new CaptureEventModel(captureEventDataSet1);
		const CaptureData2 = new CaptureEventModel(captureEventDataSet2);
		const CaptureData3 = new CaptureEventModel(captureEventDataSet3);
		await CaptureData1.save();
		await CaptureData2.save();
		await CaptureData3.save();
		const size = 2; // Two item per page

		// When
		const numberOfEvents = await CaptureEventModel.countDocuments({
			projectId
		});
		const calcPages = Math.ceil(numberOfEvents / size);

		// Then
		expect(numberOfEvents).toEqual(3);
		expect(calcPages).toEqual(2);
	});

	it("can find captureEvents for a given page", async () => {
		// Given
		const CaptureData1 = new CaptureEventModel(captureEventDataSet1);
		const CaptureData2 = new CaptureEventModel(captureEventDataSet2);
		const CaptureData3 = new CaptureEventModel(captureEventDataSet3);
		await CaptureData1.save();
		await CaptureData2.save();
		await CaptureData3.save();
		// Build pagination query
		const pageNo = 1;
		const size = 2; // Two item per page
		let queryOptions = {};
		queryOptions.skip = size * (pageNo - 1);
		queryOptions.limit = size;

		// When
		let capturedEvents = await CaptureEventModel.find(
			{ projectId },
			{},
			queryOptions
		);

		// Then
		// Should retrieve the first two capture events
		expect(capturedEvents.length).toEqual(2);
	});

	it("can find captureEvents by given date", async () => {
		// Given
		const CaptureData1 = new CaptureEventModel(captureEventDataSet1);
		const CaptureData2 = new CaptureEventModel(captureEventDataSet2);
		const CaptureData3 = new CaptureEventModel(captureEventDataSet3);
		await CaptureData1.save();
		await CaptureData2.save();
		await CaptureData3.save();
		const createdOnDate = "2020-03-24";

		// When
		let query = { projectId };
		const morningDate = new Date(createdOnDate);
		morningDate.setSeconds(0);
		morningDate.setMinutes(0);
		morningDate.setHours(0);

		const dateMidnight = new Date(morningDate);
		dateMidnight.setSeconds(59);
		dateMidnight.setMinutes(59);
		dateMidnight.setHours(23);
		query.createdOnDateTime = { $gt: morningDate, $lt: dateMidnight };

		let capturedEvents = await CaptureEventModel.find(query, {});

		// Then
		// Should retrieve the first two capture events
		expect(capturedEvents.length).toEqual(2);
		// Date times should equal
		expect(capturedEvents[0].createdOnDateTime).toEqual(
			CaptureData2.createdOnDateTime
		);
		expect(capturedEvents[1].createdOnDateTime).toEqual(
			CaptureData3.createdOnDateTime
		);
	});

	it("can retrive images for a given page", async () => {
		// Given
		const CaptureData1 = new CaptureEventModel(captureEventDataSet1);
		const CaptureData2 = new CaptureEventModel(captureEventDataSet2);
		const CaptureData3 = new CaptureEventModel(captureEventDataSet3);
		await CaptureData1.save();
		await CaptureData2.save();
		await CaptureData3.save();
		const RetrievedEvent1 = await CaptureEventModel.findOne({
			notes: captureEventDataSet1.notes
		});
		imageDataSet1.captureEventId = RetrievedEvent1._id;
		const Image1 = new ImageModel(imageDataSet1);
		await Image1.save();
		const RetrievedEvent2 = await CaptureEventModel.findOne({
			notes: captureEventDataSet2.notes
		});
		imageDataSet2.captureEventId = RetrievedEvent2._id;
		const Image2 = new ImageModel(imageDataSet2);
		await Image2.save();
		const RetrievedEvent3 = await CaptureEventModel.findOne({
			notes: captureEventDataSet3.notes
		});
		imageDataSet3.captureEventId = RetrievedEvent3._id;
		const Image3 = new ImageModel(imageDataSet3);
		await Image3.save();

		// Build pagination query
		const pageNo = 1;
		const size = 2; // Two item per page
		let queryOptions = {};
		queryOptions.skip = size * (pageNo - 1);
		queryOptions.limit = size;
		let capturedEvents = await CaptureEventModel.find(
			{ projectId },
			{},
			queryOptions
		);

		// When
		// Convert the capture event objects to mongoose objects
		capturedEvents = capturedEvents.map(event => event.toObject());
		// Retrieves the raw images associated with the capture event
		capturedEvents = await Promise.all(
			capturedEvents.map(async captureEvent => {
				captureEvent.image = await ImageModel.findOne({
					captureEventId: captureEvent._id
				});
				return captureEvent;
			})
		);

		// Then
		// Check the length of the array
		expect(capturedEvents.length).toEqual(2);
		//Check the content of the first object in the array
		expect(capturedEvents[0]._id).toEqual(RetrievedEvent1._id);
		expect(capturedEvents[0].projectId).toEqual(projectId);
		expect(capturedEvents[0].image.captureEventId).toEqual(
			RetrievedEvent1._id
		);
		expect(capturedEvents[0].image.filePath).toEqual(
			imageDataSet1.filePath
		);
		// Check the content of the second object in the array
		expect(capturedEvents[1]._id).toEqual(RetrievedEvent2._id);
		expect(capturedEvents[1].projectId).toEqual(projectId);
		expect(capturedEvents[1].image.captureEventId).toEqual(
			RetrievedEvent2._id
		);
		expect(capturedEvents[1].image.filePath).toEqual(
			imageDataSet2.filePath
		);
	});
});
