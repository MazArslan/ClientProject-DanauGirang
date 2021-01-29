import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LoginSubmit from "./LoginSubmit";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if LoginSubmit renders
describe("LoginSubmit", () => {
  it("LoginSubmit should render", () => {
    const component = shallow(<LoginSubmit />);
    expect(component.exists()).toBe(true);
  });
});
