import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Switch from "./Switch";

Enzyme.configure({ adapter: new Adapter() });

describe("Switch Renders", () => {
  it("Renders the Switch", () => {
    const component = shallow(<Switch />);
    expect(component.exists()).toBe(true);
  });
});
