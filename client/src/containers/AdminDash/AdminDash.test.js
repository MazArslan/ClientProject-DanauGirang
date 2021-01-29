import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AdminArea from "./AdminArea";
import EditUser from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if LoginSubmit renders
describe("AdminArea", () => {
  it("AdminArea should render", () => {
    const component = shallow(<AdminArea />);
    expect(component.exists()).toBe(true);
  });
});

// Test to check if LoginSubmit renders
describe("EditUser", () => {
  it("EditUser should render", () => {
    const component = shallow(<EditUser />);
    expect(component.exists()).toBe(true);
  });
});

// Test to check if LoginSubmit renders
describe("CreateUserModal", () => {
  it("CreateUserModal should render", () => {
    const component = shallow(<CreateUserModal />);
    expect(component.exists()).toBe(true);
  });
});
