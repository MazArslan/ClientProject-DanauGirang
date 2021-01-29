import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LogoutButton from "./LogoutButton";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if LogoutButton renders
describe("Logout Button", () => {
  it("Logout button should render", () => {
    const component = shallow(<LogoutButton />);
    expect(component.exists()).toBe(true);
  });
});
