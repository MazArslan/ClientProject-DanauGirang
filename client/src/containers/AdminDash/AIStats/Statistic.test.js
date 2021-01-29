import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Statistics from "./Statistics";

// Configure enzyme for current react version
Enzyme.configure({ adapter: new Adapter() });

// Test to check if LoginSubmit renders
describe("Statistics", () => {
  it("AdminArea should render", () => {
    const component = shallow(<Statistics />);
    expect(component.exists()).toBe(true);
  });
});
