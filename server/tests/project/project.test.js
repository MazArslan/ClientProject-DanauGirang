const dbHandler = require("../db-handler");
const ObjectId = require("mongodb").ObjectID;
const ProjectModel = require("../../models/Project");
const projectDataSet1 = {
  type: "CAMERA_TRAP",
  name: "Camera trap project",
  details: "Tiger camera trap",
  description: "Camera trap for honsteraw location May 21st 2020",
  tags: ["Tiger"],
  users: [{ userId: "5e6125021c9d440000a4b621" }],
};
const projectDataSet2 = {
  type: "ELEPHANT_TRACKING",
  name: "Elephant tracking project",
  tags: ["Elephant"],
  users: [{ userId: "5e6125021c9d440000b1b636" }],
};

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("Project Model Test ", () => {
  // Covers creating and saving a new project document
  it("can be created correctly", async () => {
    // Given
    const validProject = new ProjectModel(projectDataSet1);
    // When
    const savedProject = await validProject.save();
    // Then
    // _id should be defined when successfully saved to MongoDB
    expect(savedProject._id).toBeDefined();
    expect(savedProject.type).toBe(projectDataSet1.type);
    expect(savedProject.name).toBe(projectDataSet1.name);
    expect(savedProject.details).toBe(projectDataSet1.details);
    expect(savedProject.description).toBe(projectDataSet1.description);
    expect(JSON.stringify(savedProject.tags)).toBe(
      JSON.stringify(savedProject.tags)
    );
    expect(JSON.stringify(savedProject.users)).toBe(
      JSON.stringify(projectDataSet1.users)
    );
  });
});

describe("Find by userId", () => {
  it("can find a project by a given userId", async () => {
    // Given
    // Project datasets have different userId arrays
    const Project1 = new ProjectModel(projectDataSet1);
    const Project2 = new ProjectModel(projectDataSet2);
    const userId = ObjectId("5e6125021c9d440000a4b621");
    await Project1.save();
    await Project2.save();
    // When
    const allProjects = await ProjectModel.find({}, {});
    const foundProjects = await ProjectModel.find({
      users: { $elemMatch: { userId } },
    });
    // Then
    // Check that two projects are added into the database
    expect(allProjects.length).toEqual(2);
    // Check that array returned from the userId filter only contains one object
    expect(foundProjects.length).toEqual(1);
    // Check the content of the object
    expect(foundProjects[0].type).toEqual("CAMERA_TRAP");
    expect(foundProjects[0].name).toEqual("Camera trap project");
    expect(JSON.stringify(foundProjects[0].users[0])).toBe(
      JSON.stringify({ userId: userId })
    );
  });
});

describe("Find project's tags", () => {
  it("can find a project's tags by given projectId", async () => {
    // Given
    // Project datasets have different userId arrays
    const Project1 = new ProjectModel(projectDataSet1);
    await Project1.save();
    // When
    const project = await ProjectModel.find({}, {});
    const projectId = project[0]._id;
    const foundProject = await ProjectModel.findOne({
      _id: ObjectId(projectId),
    });
    // Then
    // Check that array returned only contains one object
    expect(JSON.stringify(foundProject.tags)).toEqual(
      JSON.stringify(["Tiger"])
    );
  });
});
