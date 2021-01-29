import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import Filters from "./Filters";

Enzyme.configure({ adapter: new Adapter() });

describe("<Filters/>", () => {
  const onActionMock = jest.fn();
  const props = {
    filterChoice: {
      createdOnDate: "2020-03-29",
      completionStatus: "complete"
    },
    clearFilters: onActionMock,
    applyFilters: onActionMock,
    dateChange: onActionMock,
    statusChange: onActionMock
  };
  const container = shallow(<Filters {...props} />);

  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render date selector", () => {
      expect(
        container
          .find("Input")
          .at(0)
          .props().type
      ).toEqual("date");
    });

    it("should render dropdown selector", () => {
      expect(
        container
          .find("Input")
          .at(1)
          .props().type
      ).toEqual("select");
      expect(
        container
          .find("Input")
          .at(1)
          .props().value
      ).toEqual("complete");
    });

    it("should render options", () => {
      expect(
        container
          .find("option")
          .at(0)
          .props().value
      ).toEqual("empty");
      expect(
        container
          .find("option")
          .at(1)
          .props().value
      ).toEqual("complete");
      expect(
        container
          .find("option")
          .at(2)
          .props().value
      ).toEqual("incomplete");
    });
  });
});
