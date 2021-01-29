import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import CaptureEvent from "./CaptureEvent";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectId: "5e63b45c1c9d4400001bb204",
    captureEventId: "5e63b45c1c9d4400001ba312"
  })
}));

describe("<CaptureEventForm/>", () => {
  describe("component rendering", () => {
    const wrapper = shallow(<CaptureEvent />);

    it("should render shallow correctly with props", () => {
      expect(wrapper.exists()).toBe(true);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should render a spinner", () => {
      const spinner = wrapper.find("spinner");
      expect(spinner).toBeTruthy();
    });
  });
});
