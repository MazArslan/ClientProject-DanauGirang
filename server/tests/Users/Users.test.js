const dbHandler = require("../db-handler");
const UserModel = require("../../models/Users");

const userData = {
	email: "james@user.com",
	password: "user",
	isAdmin: false,
	isActive: true
};

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());
// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());
// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("User Model Test ", () => {
	it("can be created correctly", async () => {
		// Create model of userData
		const UserEvent = new UserModel(userData);

		// Save model
		const SavedUser = await UserEvent.save();

		//Check it saves correctly
		expect(SavedUser.email).toBeDefined();
		expect(SavedUser.email.toString()).toBe(userData.email);

		expect(SavedUser.password).toBeDefined();
		expect(SavedUser.password).toBe(userData.password);

		expect(SavedUser.isAdmin).toBeDefined();
		expect(SavedUser.isAdmin).toBe(userData.isAdmin);

		expect(SavedUser.isActive).toBeDefined();
		expect(SavedUser.isActive).toBe(userData.isActive);
	});
});
