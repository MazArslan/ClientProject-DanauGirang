import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import NewProject from "./NewProjectModal";

Enzyme.configure({ adapter: new Adapter() });

// Test to check if new project renders correctly
describe("NewProject>", () => {
  it("New Project should render correctly", () => {
    const wrapper = shallow(<NewProject />);
    expect(wrapper.exists()).toBe(true);
  });
});
