import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import CaptureEventForm from "./CaptureEventForm";

Enzyme.configure({ adapter: new Adapter() });

describe("<CaptureEventForm/>", () => {
  const onActionMock = jest.fn();
  const props = {
    captureEventId: "CaptureEventId1",
    tags: ["Tiger", "Elephant", "Tapir"],
    submitted: onActionMock
  };

  describe("component rendering", () => {
    const wrapper = shallow(<CaptureEventForm {...props} />);

    it("should render shallow correctly with props", () => {
      expect(wrapper.exists()).toBe(true);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should render tags selection element", () => {
      expect(
        wrapper
          .find("Button")
          .at(0)
          .props().children
      ).toEqual("Tiger");
      expect(
        wrapper
          .find("Button")
          .at(1)
          .props().children
      ).toEqual("Elephant");
      expect(
        wrapper
          .find("Button")
          .at(2)
          .props().children
      ).toEqual("Tapir");
    });

    it("should render notes form field", () => {
      expect(wrapper.find("Label").props().for).toEqual("notesText");
      expect(wrapper.find("Label").props().children).toEqual(
        "Enter additional notes:"
      );
      expect(wrapper.find('Input[type="textarea"]').props().id).toEqual(
        "notesText"
      );
    });

    it("should set the notes element value on change event", () => {
      expect(
        wrapper.find('Input[type="textarea"]').simulate("change", {
          target: {
            value: "Updated"
          }
        })
      );
      expect(wrapper.find('Input[type="textarea"]').props().value).toEqual(
        "Updated"
      );
    });

    it("should render submit button", () => {
      const submitButton = wrapper.find('Button[className="submit-button"]');
      expect(submitButton.props().children).toEqual("Submit");
    });
  });
});
