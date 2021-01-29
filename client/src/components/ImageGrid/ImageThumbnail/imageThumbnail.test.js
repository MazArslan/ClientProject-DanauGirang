import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import ImageThumbnail from "./imageThumbnail";

Enzyme.configure({ adapter: new Adapter() });

describe("<ImageThumbnail/>", () => {
  const props = {
    id: "Unique id string",
    image: {
      filePath: "5e123ty34u35567h2g/0001.png"
    },
    cardId: 2,
    dateTime: "2020-03-22T01:00:00.000+00:00",
    isComplete: false
  };
  const container = shallow(<ImageThumbnail {...props} />);

  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render a completion marker", () => {
      expect(container.find("span").props().className).toEqual("dot-false");
    });

    it("should render a heading", () => {
      expect(container.find("b").props().children).toEqual("Image 2");
    });

    it("should render an image", () => {
      const imageString = "/api/images/cameraTrap/5e123ty34u35567h2g/0001.png";
      expect(container.find("CardImg").props().src).toEqual(imageString);
    });
  });
});
