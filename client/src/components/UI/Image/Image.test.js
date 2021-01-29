import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import Image from "./Image";

Enzyme.configure({ adapter: new Adapter() });

describe("<ImageThumbnail/>", () => {
  const props = {
    id: "Unique id string",
    filePath: "5e123ty34u35567h2g/0001.png"
  };
  const container = shallow(<Image {...props} />);

  describe("component rendering", () => {
    it("should render correctly", () => {
      expect(container.exists()).toBe(true);
      expect(toJson(container)).toMatchSnapshot();
    });

    it("should render an image", () => {
      const imageString = "/api/images/cameraTrap/5e123ty34u35567h2g/0001.png";
      expect(container.find("img").props().src).toEqual(imageString);
    });
  });
});
