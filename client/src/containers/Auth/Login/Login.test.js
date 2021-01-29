import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Login from "./Login";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if LoginSubmit renders
describe("Login", () => {
  it("Login should render", () => {
    const component = shallow(<Login />);
    expect(component.exists()).toBe(true);
  });
});
