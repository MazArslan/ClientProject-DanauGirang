const dbHandler = require("../db-handler");
const CaptureEventModel = require("../../models/CaptureEvent");
const captureEventData = {
	projectId: "5e6125021c9d440000a4b679",
	notes: "Interesting animals in picture :)",
	coordinates: "Lat: 28.59202, Long: -99.03434",
	createdOnDateTime: "2020-03-25T01:00:00.000+00:00",
	isComplete: true,
	tags: ["Elephant", "Tapir", "Tiger"]
};

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("CaptureEvent Model Test ", () => {
	it("can be created correctly", async () => {
		// Given
		const validCaptureEvent = new CaptureEventModel(captureEventData);
		// When
		const savedCaptureEvent = await validCaptureEvent.save();
		// Then
		expect(savedCaptureEvent._id).toBeDefined();
		expect(savedCaptureEvent.projectId.toString()).toBe(
			captureEventData.projectId
		);
		expect(savedCaptureEvent.notes).toBe(captureEventData.notes);
		expect(savedCaptureEvent.coordinates).toBe(
			captureEventData.coordinates
		);
		expect(savedCaptureEvent.isComplete).toBe(captureEventData.isComplete);
		expect(Array.from(savedCaptureEvent.tags)).toEqual(
			captureEventData.tags
		);
	});
});
