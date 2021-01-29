import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ConfirmationModal from "./ConfirmationModal";

Enzyme.configure({ adapter: new Adapter() });

describe("<ConfirmationModal/>", () => {
  const onActionMock = jest.fn();
  const props = {
    modal: true,
    toggle: onActionMock,
    onSubmit: onActionMock
  };
  const container = shallow(<ConfirmationModal {...props} />);

  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render modal header", () => {
      const textHeading = "Submission confirmation";
      expect(container.find("ModalHeader").props().children).toEqual(
        textHeading
      );
    });

    it("should render modal body", () => {
      const textBody = "Are you sure you want to submit?";
      expect(container.find("ModalBody").props().children).toEqual(textBody);
    });

    it("should render cancel button", () => {
      expect(
        container
          .find("Button")
          .at(0)
          .props().className
      ).toEqual("cancel-button");
    });

    it("should render submit button", () => {
      expect(
        container
          .find("Button")
          .at(1)
          .props().className
      ).toEqual("submit-button");
    });
  });
});
