import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import RadioGroup from "./RadioGroup";

Enzyme.configure({ adapter: new Adapter() });

describe("<RadioGroup/>", () => {
  const onActionMock = jest.fn();
  const props = {
    aiId: "5e8f013965372f3768b7a2c3",
    radioButtonForm: { "5e8f013965372f3768b7a2c3": "YES" },
    selectedButtonChanged: onActionMock
  };
  const container = shallow(<RadioGroup {...props} />);

  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render active YES button", () => {
      expect(
        container
          .find("Button")
          .at(0)
          .props().value
      ).toEqual("YES");
      expect(
        container
          .find("Button")
          .at(0)
          .props().active
      ).toEqual(true);
    });

    it("should render inactive NO button", () => {
      expect(
        container
          .find("Button")
          .at(1)
          .props().value
      ).toEqual("NO");
      expect(
        container
          .find("Button")
          .at(1)
          .props().active
      ).toEqual(false);
    });
  });
});
