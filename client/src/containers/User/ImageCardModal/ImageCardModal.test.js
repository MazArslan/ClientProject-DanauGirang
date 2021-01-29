import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ImageCardModal from "./ImageCardModal";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({})
}));

describe("<ImageCardModal/>", () => {
  const onActionMock = jest.fn();
  const props = {
    captureEventsId: ["CaptureEventId1", "CaptureEventId2", "CaptureEventId3"],
    projectId: "ProjectId1",
    cardId: 2,
    tags: ["Tiger", "Elephant", "Tapir"],
    totalCaptureEvents: 10,
    pageNumber: 2,
    pageSize: 6,
    isOpen: false,
    toggle: onActionMock
  };

  describe("component rendering", () => {
    const wrapper = shallow(<ImageCardModal {...props} />);

    it("should render shallow correctly with props", () => {
      expect(wrapper.exists()).toBe(true);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should render permalink button", () => {
      const permalinkButton = wrapper.find(
        'Button[className="permalink-button"]'
      );
      expect(permalinkButton.props().className).toEqual("permalink-button");
      expect(permalinkButton.props().tag).toEqual("button");
    });

    it("should render permalink button contents", () => {
      const buttonText = wrapper.find("p");
      expect(buttonText.props().children).toEqual("Permalink");
    });
  });
});
