import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ImageGrid from "./ImageGrid";

Enzyme.configure({ adapter: new Adapter() });

// Mocks the useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectId: "5e63b45c1c9d4400001bb204"
  })
}));

describe("<ImageGrid/>", () => {
  describe("component rendering", () => {
    const container = shallow(<ImageGrid />);
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render a show filters button", () => {
      expect(
        container
          .find("Button")
          .at(0)
          .props().className
      ).toEqual("filter-button");
      expect(container.find("FontAwesomeIcon").props().icon.iconName).toEqual(
        "filter"
      );
    });

    it("should render pagination bar navigation buttons", () => {
      expect(
        container
          .find("PaginationItem")
          .at(0)
          .props().className
      ).toEqual("navigate-back");
      expect(
        container
          .find("PaginationItem")
          .at(1)
          .props().className
      ).toEqual("navigate-forward");
    });
  });
});
