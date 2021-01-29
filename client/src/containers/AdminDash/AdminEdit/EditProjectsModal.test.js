import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import EditProjectsModal from "./EditProjectsModal";

Enzyme.configure({ adapter: new Adapter() });

// Test to check if edit project renders correctly
describe("EditProjectsModal", () => {
  it("Edit Projects Modal should render", () => {
    const component = shallow(<EditProjectsModal />);
    expect(component.exists()).toBe(true);
  });
});
