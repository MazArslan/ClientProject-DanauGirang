import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PaginationButton from "./PaginationButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<PaginationButton/>", () => {
  const onActionMock = jest.fn();
  const props = {
    isDisabled: false,
    clicked: onActionMock,
    text: ">"
  };
  const container = shallow(<PaginationButton {...props} />);

  it("should render correctly", () => {
    expect(container.exists()).toBe(true);
    expect(container.html()).toMatchSnapshot();
  });

  it("should render text", () => {
    const text = ">";
    expect(container.props("text").children).toEqual(text);
  });

  it("should render button", () => {
    expect(container.find("Button").props()).toEqual({
      children: ">",
      className: "arrow-button",
      color: "info",
      disabled: false,
      onClick: onActionMock,
      outline: true,
      tag: "button"
    });
  });
});
