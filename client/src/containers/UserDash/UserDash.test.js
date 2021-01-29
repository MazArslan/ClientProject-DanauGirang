import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AllProjects from "./AllProjects";
import ProjectCard from "./ProjectCard";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if AllProjects renders
describe("All Projects", () => {
  it("Render all projects", () => {
    const component = shallow(<AllProjects />);
    expect(component.exists()).toBe(true);
  });
});

// Test to check if Project Card renders
describe("Project Card", () => {
  it("Render Project Card", () => {
    const component = shallow(<ProjectCard />);
    expect(component.exists()).toBe(true);
  });
});
