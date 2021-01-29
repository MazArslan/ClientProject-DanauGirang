import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "./Spinner";

Enzyme.configure({ adapter: new Adapter() });
describe("<Spinner/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.exists()).toBe(true);
  });
});
