import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import PageCount from "./pageCount";

Enzyme.configure({ adapter: new Adapter() });

describe("<PageCount/>", () => {
  const props = {
    currentPage: "3",
    totalPages: "5"
  };
  const container = shallow(<PageCount {...props} />);
  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render text", () => {
      const textBody = "Page 3 out of 5";
      const foundStringArray = container.find("i").props().children;
      expect(foundStringArray.join("")).toEqual(textBody);
    });
  });
});
